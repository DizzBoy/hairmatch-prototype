import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Tabs, Tab, Button, Paper, Divider, Snackbar, Alert } from '@mui/material';
import PageContainer from '../components/PageContainer';
import PrimaryButton from '../components/PrimaryButton';
import ShareIcon from '@mui/icons-material/Share';
import DescriptionIcon from '@mui/icons-material/Description';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// 假设的发型数据
const hairstyleData = [
  {
    id: 1,
    name: '时尚短发',
    originalImage: 'https://images.unsplash.com/photo-1620122830784-c29a955e0c77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHNob3J0JTIwaGFpcnN0eWxlfGVufDB8fDB8fHww',
    previewFront: 'https://plus.unsplash.com/premium_photo-1664530352657-8e94f789e5ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhY2UlMjBzaG9ydCUyMGhhaXJ8ZW58MHx8MHx8fDA%3D',
    previewSide: 'https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhY2UlMjBzaG9ydCUyMGhhaXJ8ZW58MHx8MHx8fDA%3D',
    matchScore: 96,
    style: '精致时尚',
    length: '短发',
    occasion: '日常',
    description: '这款短发造型轻盈活泼，突出脸部轮廓，适合您的卵形脸型。发丝的层次感为整体增添了活力，同时不会让脸部看起来过宽。'
  },
  {
    id: 2,
    name: '波浪中长发',
    originalImage: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaXVtJTIwaGFpcnN0eWxlfGVufDB8fDB8fHww',
    previewFront: 'https://images.unsplash.com/photo-1471017851983-fc49d89c57c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybCUyMG1lZGl1bSUyMGhhaXJ8ZW58MHx8MHx8fDA%3D',
    previewSide: 'https://images.unsplash.com/photo-1554519515-242161756769?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMG1lZGl1bSUyMGhhaXIlMjBzaWRlfGVufDB8fDB8fHww',
    matchScore: 92,
    style: '浪漫',
    length: '中长发',
    occasion: '多用途',
    description: '自然的波浪中长发为您带来柔美的轮廓，突出您的脸型优势。发尾的轻微层次与卵形脸非常相配，创造出平衡和谐的整体外观。'
  },
  {
    id: 3,
    name: '侧分长直发',
    originalImage: 'https://images.unsplash.com/photo-1580501170888-80668882ca0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvbmclMjBoYWlyc3R5bGV8ZW58MHx8MHx8fDA%3D',
    previewFront: 'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGdpcmwlMjBsb25nJTIwaGFpcnxlbnwwfHwwfHx8MA%3D%3D',
    previewSide: 'https://images.unsplash.com/photo-1550151103-0135d8e13537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMGxvbmclMjBoYWlyJTIwc2lkZXxlbnwwfHwwfHx8MA%3D%3D',
    matchScore: 85,
    style: '优雅',
    length: '长发',
    occasion: '正式',
    description: '侧分的长直发帮助修饰脸型，让您的五官更加突出。这种造型简洁但不失优雅，特别适合正式场合和职业环境。'
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const HairStylePreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);
  const [userChoice, setUserChoice] = useState<'like' | 'dislike' | 'undecided' | null>(null);

  // 根据ID获取发型数据
  const hairStyle = hairstyleData.find(style => style.id === Number(id));

  useEffect(() => {
    // 如果没有找到对应发型数据，则返回列表页
    if (!hairStyle && id) {
      navigate('/recommendation');
    }
  }, [hairStyle, id, navigate]);

  if (!hairStyle) {
    return null;
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUserChoice = (choice: 'like' | 'dislike' | 'undecided') => {
    setUserChoice(choice);
    setSnackbarOpen(true);
  };

  const handleShare = () => {
    // 实际应用中这里会实现分享功能
    setShareSnackbarOpen(true);
  };

  const handleViewGuide = () => {
    navigate(`/guide/${id}`);
  };

  return (
    <PageContainer title="发型预览" showBackButton>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          {hairStyle.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          适合度: <span style={{ color: '#9c6eff', fontWeight: 'bold' }}>{hairStyle.matchScore}%</span>
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="正面" />
          <Tab label="侧面" />
          <Tab label="原图" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box
          component="img"
          src={hairStyle.previewFront}
          alt={`${hairStyle.name} - 正面预览`}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: '450px',
            objectFit: 'cover',
            borderRadius: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Box
          component="img"
          src={hairStyle.previewSide}
          alt={`${hairStyle.name} - 侧面预览`}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: '450px',
            objectFit: 'cover',
            borderRadius: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Box
          component="img"
          src={hairStyle.originalImage}
          alt={`${hairStyle.name} - 原图`}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: '450px',
            objectFit: 'cover',
            borderRadius: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      </TabPanel>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          您喜欢这款发型吗？
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant={userChoice === 'like' ? 'contained' : 'outlined'}
            color="primary"
            startIcon={<ThumbUpIcon />}
            onClick={() => handleUserChoice('like')}
            sx={{ borderRadius: 8, py: 1.5, flex: 1 }}
          >
            喜欢
          </Button>
          <Button
            variant={userChoice === 'dislike' ? 'contained' : 'outlined'}
            color="primary"
            startIcon={<ThumbDownIcon />}
            onClick={() => handleUserChoice('dislike')}
            sx={{ borderRadius: 8, py: 1.5, flex: 1 }}
          >
            不喜欢
          </Button>
          <Button
            variant={userChoice === 'undecided' ? 'contained' : 'outlined'}
            color="primary"
            startIcon={<HelpOutlineIcon />}
            onClick={() => handleUserChoice('undecided')}
            sx={{ borderRadius: 8, py: 1.5, flex: 1 }}
          >
            不确定
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 4,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          发型特点
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hairStyle.description}
        </Typography>
        
        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          为什么适合您
        </Typography>
        <Typography variant="body2" color="text.secondary">
          基于您的卵形脸型，这款{hairStyle.length}发型能够很好地平衡您的面部比例。
          {hairStyle.style}风格与您的脸型轮廓相得益彰，突出您的优势特点。
          特别适合{hairStyle.occasion}场合，让您看起来更加自信魅力。
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ShareIcon />}
          onClick={handleShare}
          sx={{ borderRadius: 8, py: 1.5 }}
        >
          分享给朋友评价
        </Button>
        <PrimaryButton
          startIcon={<DescriptionIcon />}
          onClick={handleViewGuide}
        >
          查看理发指南
        </PrimaryButton>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          谢谢您的反馈！我们会根据您的选择优化推荐。
        </Alert>
      </Snackbar>

      <Snackbar
        open={shareSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setShareSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShareSnackbarOpen(false)} severity="info">
          分享链接已复制，您可以发送给朋友请求反馈。
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default HairStylePreview; 