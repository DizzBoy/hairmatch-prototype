import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

// 分析过程中的随机短语
const coolPhrases = [
  "解析你的神颜面部数据...",
  "搜索宇宙中最适合你的发型...",
  "计算你的颜值潜力指数...",
  "为你的发型增添魔法...",
  "定制你的专属发型DNA...",
  "解锁你的终极颜值...",
  "检测脸蛋黄金比例...",
  "匹配发型超能力...",
  "AI正在脑补你的酷炫造型...",
  "扫描你的面部超能量...",
];

const FaceAnalysisLoading: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [phrase, setPhrase] = useState(coolPhrases[0]);
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    // 随机切换酷炫短语
    const phraseInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * coolPhrases.length);
      setPhrase(coolPhrases[randomIndex]);
    }, 1500);

    // 动画帧
    const animInterval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 6);
    }, 400);

    // 进度条动画
    const startTime = Date.now();
    const totalDuration = 5000; // 总持续时间5秒
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        clearInterval(phraseInterval);
        clearInterval(animInterval);
        
        // 延迟一下再跳转，让100%的状态展示一下
        setTimeout(() => {
          navigate('/face-analysis');
        }, 500);
      }
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(phraseInterval);
      clearInterval(animInterval);
    };
  }, [navigate]);

  // 动画元素
  const renderAnimationElement = () => {
    // 根据动画帧返回不同的样式
    const getAnimStyle = () => {
      const baseSize = 120 + (animationFrame % 3) * 10;
      const rotation = (animationFrame * 60) % 360;
      const opacity = 0.7 + (animationFrame % 3) * 0.1;
      
      return {
        width: baseSize,
        height: baseSize,
        transform: `rotate(${rotation}deg)`,
        opacity
      };
    };
    
    return (
      <Box sx={{
        position: 'relative',
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={140}
          thickness={3}
          sx={{
            position: 'absolute',
            color: '#9c6eff',
            zIndex: 2,
          }}
        />
        
        {/* 背景动画元素 */}
        <Box sx={{
          position: 'absolute',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(156,110,255,0.4) 0%, rgba(156,110,255,0) 70%)',
          animation: 'pulse 2s infinite ease-in-out',
          ...getAnimStyle()
        }} />
        
        <Box sx={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
        }}>
          <AutoFixHighIcon sx={{ fontSize: 50, color: '#ffffff' }} />
        </Box>
        
        <Typography 
          variant="h3" 
          sx={{ 
            position: 'absolute',
            fontWeight: 'bold',
            color: 'white',
            zIndex: 3,
          }}
        >
          {Math.round(progress)}%
        </Typography>
      </Box>
    );
  };

  return (
    <PageContainer title="" showBackButton={false}>
      <Box sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pb: 10,
        background: 'linear-gradient(180deg, #121212 0%, #1e1e1e 100%)',
      }}>
        <Paper 
          elevation={0}
          sx={{ 
            bgcolor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 500,
            width: '100%',
            mb: 4,
            p: 3,
          }}
        >
          {renderAnimationElement()}
          
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                mb: 1,
                background: 'linear-gradient(90deg, #9c6eff 0%, #ff7eec 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {phrase}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="rgba(255,255,255,0.7)"
              sx={{ mt: 2 }}
            >
              坐等几秒，马上解锁你的超级发型!
            </Typography>
          </Box>
        </Paper>
      </Box>
    </PageContainer>
  );
};

export default FaceAnalysisLoading; 