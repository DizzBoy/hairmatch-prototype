import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PrimaryButton from '../components/PrimaryButton';

// 假设的脸型分析结果
interface FaceAnalysisResult {
  faceShape: string;
  description: string;
  features: string[];
  currentHairScore: number;
}

const FaceAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<FaceAnalysisResult | null>(null);

  // 模拟API调用获取脸型分析
  useEffect(() => {
    const timer = setTimeout(() => {
      setResult({
        faceShape: '卵形脸',
        description: '卵形脸是最理想的脸型，上下对称，轮廓均匀，适合多种发型。',
        features: ['额头较宽', '下巴圆润', '脸颊线条柔和', '脸部轮廓对称'],
        currentHairScore: 68,
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/recommendation');
  };

  if (loading) {
    return (
      <PageContainer title="脸型分析" showBackButton>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
          }}
        >
          <CircularProgress color="primary" size={60} thickness={4} />
          <Typography variant="h6" mt={4} textAlign="center">
            正在分析您的脸型...
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2} textAlign="center">
            我们正在使用AI算法分析您的面部特征
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="脸型分析结果" showBackButton>
      <Box sx={{ my: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          您的脸型分析
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI分析结果将帮助我们为您推荐最合适的发型
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          bgcolor: 'rgba(156, 110, 255, 0.1)',
          border: '1px solid rgba(156, 110, 255, 0.3)',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          脸型: {result?.faceShape}
        </Typography>
        <Typography variant="body1" mb={3}>
          {result?.description}
        </Typography>
        
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          面部特征:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          {result?.features.map((feature, index) => (
            <Typography component="li" key={index} variant="body2" mb={0.5}>
              {feature}
            </Typography>
          ))}
        </Box>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          当前发型匹配度
        </Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%' }}>
          <CircularProgress
            variant="determinate"
            value={result?.currentHairScore || 0}
            size={120}
            thickness={6}
            sx={{ mx: 'auto', display: 'block' }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Typography variant="h4" component="div" color="primary">
              {`${result?.currentHairScore || 0}%`}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="body1" fontWeight="bold">
            为您推荐的发型方向:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            • 添加适当的层次感，增加脸部线条立体感
          </Typography>
          <Typography variant="body2">
            • 避免过于蓬松的发型，以免使脸部看起来更宽
          </Typography>
          <Typography variant="body2">
            • 可尝试带有适度刘海的中长发型，突出您的五官优势
          </Typography>
        </Grid>
      </Grid>

      <PrimaryButton onClick={handleContinue}>
        查看推荐发型
      </PrimaryButton>
    </PageContainer>
  );
};

export default FaceAnalysis; 