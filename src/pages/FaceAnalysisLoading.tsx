import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Stepper, Step, StepLabel, Paper, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import FaceIcon from '@mui/icons-material/Face';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

// 分析步骤
const analysisSteps = [
  {
    label: '面部特征提取',
    description: '检测面部轮廓、五官位置和比例关系',
    icon: <FaceIcon />,
    duration: 1300, // 毫秒
  },
  {
    label: '脸型分析',
    description: '判断脸型类别并分析适合的发型特点',
    icon: <AnalyticsIcon />,
    duration: 1200,
  },
  {
    label: '发质分析',
    description: '根据图片分析发质类型和发量特点',
    icon: <ContentCutIcon />,
    duration: 800,
  },
  {
    label: '发型匹配',
    description: '基于AI模型推荐最佳发型选择',
    icon: <AutoFixHighIcon />,
    duration: 1500,
  },
  {
    label: '完成',
    description: '分析完成，准备展示结果',
    icon: <CheckCircleIcon />,
    duration: 200,
  },
];

const FaceAnalysisLoading: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [subprogress, setSubprogress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [analysisMessages] = useState<string[]>([
    "正在检测面部关键点...",
    "分析面部轮廓...",
    "测量脸型比例...",
    "提取发质特征..."
  ]);

  // 当前分析消息
  const [currentMessage, setCurrentMessage] = useState("");

  // 模拟步骤进度
  useEffect(() => {
    if (activeStep < analysisSteps.length) {
      const startTime = Date.now();
      
      // 设置当前步骤的消息
      const messageInterval = setInterval(() => {
        setCurrentMessage(prev => {
          const randomIndex = Math.floor(Math.random() * analysisMessages.length);
          return analysisMessages[randomIndex];
        });
      }, 800);
      
      // 更新子进度条
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentDuration = analysisSteps[activeStep].duration;
        const progress = Math.min((elapsed / currentDuration) * 100, 100);
        
        setSubprogress(progress);
        
        // 更新总体进度
        const stepsCompleted = activeStep;
        const currentStepContribution = progress / 100 / analysisSteps.length;
        const totalProgress = (stepsCompleted / analysisSteps.length) + currentStepContribution;
        setTotalProgress(totalProgress * 100);
        
      }, 50);

      // 当前步骤完成后
      const timer = setTimeout(() => {
        if (activeStep < analysisSteps.length - 1) {
          setActiveStep(prevStep => prevStep + 1);
          setSubprogress(0);
        } else {
          // 全部步骤完成，导航到结果页面
          setTimeout(() => {
            navigate('/face-analysis');
          }, 500);
        }
        clearInterval(progressInterval);
        clearInterval(messageInterval);
      }, analysisSteps[activeStep].duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
        clearInterval(messageInterval);
      };
    }
  }, [activeStep, navigate, analysisMessages]);

  return (
    <PageContainer title="面部分析中" showBackButton={false}>
      <Box sx={{ my: 2, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          AI 正在分析您的面部特征
        </Typography>
        <Typography variant="body2" color="text.secondary">
          我们正在使用先进的AI技术分析您的脸型特点、发质、肤色等，找出最适合您的发型
        </Typography>
      </Box>

      {/* 总体进度 */}
      <Box sx={{ mt: 2, mb: 4, width: '100%' }}>
        <LinearProgress 
          variant="determinate" 
          value={totalProgress} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: 'rgba(156, 110, 255, 0.2)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#9c6eff',
            }
          }} 
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {Math.round(totalProgress)}%
          </Typography>
        </Box>
      </Box>

      {/* 分析视觉效果 */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 4,
          bgcolor: 'rgba(156, 110, 255, 0.05)',
          border: '1px solid rgba(156, 110, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <CircularProgress color="primary" size={70} thickness={4} />
          <Typography variant="body1" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
            {analysisSteps[activeStep].label}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
            {currentMessage || analysisSteps[activeStep].description}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={subprogress} 
            sx={{ 
              width: '100%', 
              height: 6, 
              borderRadius: 3,
              backgroundColor: 'rgba(156, 110, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#9c6eff',
              }
            }} 
          />
        </Box>
      </Paper>

      {/* 步骤进度条 */}
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {analysisSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel 
              StepIconProps={{ 
                icon: step.icon,
                active: index === activeStep,
                completed: index < activeStep,
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* 提示信息 */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          请稍等片刻，我们正在为您提供个性化的发型建议
        </Typography>
      </Box>
    </PageContainer>
  );
};

export default FaceAnalysisLoading; 