import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Divider, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import PageContainer from '../components/PageContainer';
import PrimaryButton from '../components/PrimaryButton';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import DownloadIcon from '@mui/icons-material/Download';

// 假设的发型数据和指南
const hairstyleData = [
  {
    id: 1,
    name: '时尚短发',
    image: 'https://images.unsplash.com/photo-1620122830784-c29a955e0c77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHNob3J0JTIwaGFpcnN0eWxlfGVufDB8fDB8fHww',
    matchScore: 96,
    style: '精致时尚',
    length: '短发',
    occasion: '日常',
    description: '这款短发造型轻盈活泼，突出脸部轮廓，适合您的卵形脸型。发丝的层次感为整体增添了活力，同时不会让脸部看起来过宽。',
    steps: [
      '请理发师使用剪刀而非推子，以保留头顶的长度和质感',
      '两侧和后脑勺剪短至约2-3厘米长，保留纹理感',
      '顶部保留5-7厘米长度，并加入轻微层次感',
      '发际线附近的头发稍剪短，打造出纹理感',
      '完成后用少量定型产品，抓出纹理和蓬松感'
    ],
    tips: [
      '告诉理发师您想要保留头顶的长度和蓬松感',
      '参考照片是重要的沟通工具，可以展示您想要的效果',
      '询问理发师如何在家中简单打理这款发型',
      '考虑您的发质和生活方式，可能需要调整发型细节'
    ]
  },
  {
    id: 2,
    name: '波浪中长发',
    image: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaXVtJTIwaGFpcnN0eWxlfGVufDB8fDB8fHww',
    matchScore: 92,
    style: '浪漫',
    length: '中长发',
    occasion: '多用途',
    description: '自然的波浪中长发为您带来柔美的轮廓，突出您的脸型优势。发尾的轻微层次与卵形脸非常相配，创造出平衡和谐的整体外观。',
    steps: [
      '总体长度保持在锁骨或肩膀位置',
      '请理发师添加长层次感，特别是脸部周围的部分',
      '发尾轻微剪薄，增加活力和动感',
      '可以考虑添加侧分或中分的刘海，根据脸型调整',
      '完成后使用卷发棒或波浪造型产品增添自然波浪'
    ],
    tips: [
      '展示照片给理发师，明确表达您想要的波浪程度',
      '询问适合您发质的护理和定型产品建议',
      '了解如何用最简单的方法在家中创造波浪效果',
      '考虑染发可以增加头发的层次感和立体感'
    ]
  },
  {
    id: 3,
    name: '侧分长直发',
    image: 'https://images.unsplash.com/photo-1580501170888-80668882ca0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvbmclMjBoYWlyc3R5bGV8ZW58MHx8MHx8fDA%3D',
    matchScore: 85,
    style: '优雅',
    length: '长发',
    occasion: '正式',
    description: '侧分的长直发帮助修饰脸型，让您的五官更加突出。这种造型简洁但不失优雅，特别适合正式场合和职业环境。',
    steps: [
      '保持总体长度，通常在胸部位置或更长',
      '加入轻微的长层次，尤其是靠近脸部的部分',
      '侧分处理，让头发自然垂落，一侧比另一侧更多',
      '剪薄发尾以增加活力，避免整体过于厚重',
      '可考虑添加长侧刘海，柔化脸部轮廓'
    ],
    tips: [
      '与理发师讨论您的发质特点，调整层次感',
      '了解直发护理方法，保持健康光泽',
      '询问如何在家中轻松维持侧分效果',
      '考虑添加挑染或渐变染色，增强立体感'
    ]
  },
];

const HairStyleGuide: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
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

  const stepIcons = [
    <LooksOneIcon fontSize="large" />,
    <LooksTwoIcon fontSize="large" />,
    <Looks3Icon fontSize="large" />,
    <Looks4Icon fontSize="large" />,
    <Looks5Icon fontSize="large" />,
  ];

  const handleCopyGuide = () => {
    const guideText = `
${hairStyle.name} 理发指南：

步骤：
${hairStyle.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

提示：
${hairStyle.tips.map((tip, index) => `• ${tip}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(guideText);
    alert('理发指南已复制到剪贴板！');
  };

  const handleShare = () => {
    // 实际应用中这里会实现分享功能
    alert('分享功能正在开发中');
  };

  return (
    <PageContainer title="理发指南" showBackButton>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          {hairStyle.name} 理发指南
        </Typography>
        <Typography variant="body2" color="text.secondary">
          将此指南展示给您的理发师，帮助您获得完美效果
        </Typography>
      </Box>

      <Box
        component="img"
        src={hairStyle.image}
        alt={hairStyle.name}
        sx={{
          width: '100%',
          height: 250,
          objectFit: 'cover',
          borderRadius: 4,
          mb: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      />

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
          理发步骤
        </Typography>

        <List sx={{ mb: 3 }}>
          {hairStyle.steps.map((step, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ px: 1, py: 2 }}>
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {stepIcons[index]}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body1" fontWeight="medium">
                    步骤 {index + 1}
                  </Typography>
                }
                secondary={step}
                secondaryTypographyProps={{ 
                  variant: 'body2', 
                  color: 'text.primary',
                  sx: { mt: 0.5 }
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" mb={2}>
          提示和建议
        </Typography>
        <List>
          {hairStyle.tips.map((tip, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <Typography variant="body2" component="div" sx={{ display: 'flex' }}>
                <Box component="span" sx={{ mr: 1 }}>•</Box>
                {tip}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyGuide}
          sx={{ borderRadius: 8, py: 1.5 }}
        >
          复制理发指南
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ShareIcon />}
          onClick={handleShare}
          sx={{ borderRadius: 8, py: 1.5 }}
        >
          分享给理发师
        </Button>
        <PrimaryButton
          startIcon={<DownloadIcon />}
        >
          保存为PDF（方便展示）
        </PrimaryButton>
      </Box>
    </PageContainer>
  );
};

export default HairStyleGuide; 