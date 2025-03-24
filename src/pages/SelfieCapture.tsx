import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PrimaryButton from '../components/PrimaryButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

enum SelfieType {
  FRONT = 'front',
  SIDE = 'side'
}

const SelfieCapture: React.FC = () => {
  const navigate = useNavigate();
  const [activeSelfie, setActiveSelfie] = useState<SelfieType>(SelfieType.FRONT);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [sideImage, setSideImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          if (activeSelfie === SelfieType.FRONT) {
            setFrontImage(e.target.result as string);
          } else {
            setSideImage(e.target.result as string);
          }
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const triggerFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleContinue = () => {
    // 正常情况下这里会上传图片到服务器，但现在只做前端体验
    navigate('/face-analysis');
  };

  const switchSelfieType = () => {
    setActiveSelfie(activeSelfie === SelfieType.FRONT ? SelfieType.SIDE : SelfieType.FRONT);
  };

  const renderCameraView = () => (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(255,255,255,0.05)',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {activeSelfie === SelfieType.FRONT && frontImage ? (
        <Box component="img" src={frontImage} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : activeSelfie === SelfieType.SIDE && sideImage ? (
        <Box component="img" src={sideImage} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <CameraAltIcon sx={{ fontSize: 60, color: '#9c6eff', mb: 2 }} />
          <Typography variant="body1">
            {activeSelfie === SelfieType.FRONT ? '请拍摄正面照片' : '请拍摄侧面照片'}
          </Typography>
        </Box>
      )}
    </Paper>
  );

  return (
    <PageContainer title="拍摄自拍照片" showBackButton>
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="body1" color="text.secondary" mb={2}>
          请提供您的正面和侧面照片，以便我们分析您的脸型并推荐最适合的发型
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Button
            variant={activeSelfie === SelfieType.FRONT ? 'contained' : 'outlined'}
            fullWidth
            onClick={() => setActiveSelfie(SelfieType.FRONT)}
            sx={{ 
              borderRadius: 8, 
              py: 1.5,
              bgcolor: activeSelfie === SelfieType.FRONT ? 'primary.main' : 'transparent',
              borderColor: 'primary.main'
            }}
          >
            正面
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant={activeSelfie === SelfieType.SIDE ? 'contained' : 'outlined'}
            fullWidth
            onClick={() => setActiveSelfie(SelfieType.SIDE)}
            sx={{ 
              borderRadius: 8, 
              py: 1.5,
              bgcolor: activeSelfie === SelfieType.SIDE ? 'primary.main' : 'transparent',
              borderColor: 'primary.main'
            }}
          >
            侧面
          </Button>
        </Grid>
      </Grid>

      {renderCameraView()}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<FlipCameraIosIcon />}
          onClick={switchSelfieType}
          sx={{ borderRadius: 8, py: 1.5 }}
        >
          切换
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={triggerFilePicker}
          sx={{ borderRadius: 8, py: 1.5 }}
        >
          拍摄照片
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <PrimaryButton
          onClick={handleContinue}
          disabled={!frontImage || !sideImage}
        >
          下一步
        </PrimaryButton>
      </Box>
    </PageContainer>
  );
};

export default SelfieCapture; 