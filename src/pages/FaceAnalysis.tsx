import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Grid, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import PrimaryButton from '../components/PrimaryButton';

// 更新的脸型分析结果接口
interface FaceAnalysisResult {
  faceShape: string;
  description: string;
  features: string[];
  hairTexture: {
    type: string;
    description: string;
  };
  hairVolume: {
    level: string;
    description: string;
  };
  skinTone: {
    tone: string;
    description: string;
  };
  ageGroup: {
    group: string;
    description: string;
  };
  lifestyle: {
    type: string;
    description: string;
  };
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
        hairTexture: {
          type: '中性发质',
          description: '您的发质属于中性类型，不太干也不太油，发丝中等粗细，韧性适中，适合多种发型和造型方式。'
        },
        hairVolume: {
          level: '中等发量',
          description: '您的发量中等，既不过于稀疏也不太浓密，可以轻松驾驭多种风格的发型，蓬松感和贴合度都能良好展现。'
        },
        skinTone: {
          tone: '温暖色调',
          description: '您的肤色属于温暖色调，适合金色、铜色、琥珀色等暖色系的发色，能够提亮肤色并增添和谐感。'
        },
        ageGroup: {
          group: '25-35岁',
          description: '这个年龄段既有活力也注重专业形象，发型可以兼顾时尚感和得体度，既不过于张扬也不老气。'
        },
        lifestyle: {
          type: '职场活跃型',
          description: '您的生活方式以职场为主，同时兼顾社交活动，需要发型既专业又不乏时尚感，且便于快速打理。'
        },
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
            正在分析您的脸型和特征...
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={2} textAlign="center">
            我们正在使用AI算法全方位分析您的特征，为您推荐最适合的发型
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="全面特征分析" showBackButton>
      <Box sx={{ my: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          您的全面分析报告
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI已完成对您的全方位特征分析，包括脸型、发质、发量、肤色、年龄、及生活方式
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

      {/* 新增的分析维度 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={3}>
          发质和发量分析
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            发质: {result?.hairTexture.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {result?.hairTexture.description}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            发量: {result?.hairVolume.level}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {result?.hairVolume.description}
          </Typography>
        </Box>
      </Paper>
      
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={3}>
          肤色分析
        </Typography>
        
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          肤色调: {result?.skinTone.tone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {result?.skinTone.description}
        </Typography>
      </Paper>
      
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={3}>
          年龄与生活方式
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            年龄段: {result?.ageGroup.group}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {result?.ageGroup.description}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            生活方式: {result?.lifestyle.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {result?.lifestyle.description}
          </Typography>
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
          <Typography variant="body2">
            • 考虑到您的发质和发量，建议选择便于打理且能保持造型的款式
          </Typography>
          <Typography variant="body2">
            • 根据您的肤色，可选择带有暖色调的染色，提亮整体形象
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