import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PrimaryButton from '../components/PrimaryButton';
import PersonIcon from '@mui/icons-material/Person';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer fullWidth>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100vh',
          pt: 8,
          pb: 4,
          px: 3,
          textAlign: 'center'
        }}
      >
        <Box>
          <Paper
            elevation={0}
            sx={{
              width: 160,
              height: 160,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255,255,255,0.1)',
              borderRadius: 4,
              mb: 4,
              mx: 'auto'
            }}
          >
            <PersonIcon sx={{ fontSize: 60, color: '#9c6eff' }} />
          </Paper>

          <Typography variant="h4" component="h1" fontWeight="bold" mb={2}>
            欢迎使用UMAX
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={6}>
            我们帮你找到最适合你的发型
          </Typography>
        </Box>

        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
          <PrimaryButton onClick={() => navigate('/selfie')}>
            开始体验
          </PrimaryButton>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Welcome; 