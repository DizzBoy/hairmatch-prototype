import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, Rating, Button, Divider, Paper, TextField, Snackbar, Alert, CircularProgress } from '@mui/material';
import PageContainer from '../components/PageContainer';
import PrimaryButton from '../components/PrimaryButton';
import SendIcon from '@mui/icons-material/Send';

// 假设的发型数据 - 实际应用中应当从API获取
const hairstyleData = [
  {
    id: 1,
    name: '时尚短发',
    image: 'https://images.unsplash.com/photo-1620122830784-c29a955e0c77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHNob3J0JTIwaGFpcnN0eWxlfGVufDB8fDB8fHww',
    matchScore: 96,
    style: '精致时尚',
    length: '短发',
    occasion: '日常',
    description: '这款短发造型轻盈活泼，突出脸部轮廓，适合卵形脸型。发丝的层次感为整体增添了活力，同时不会让脸部看起来过宽。'
  },
  {
    id: 2,
    name: '波浪中长发',
    image: 'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaXVtJTIwaGFpcnN0eWxlfGVufDB8fDB8fHww',
    matchScore: 92,
    style: '浪漫',
    length: '中长发',
    occasion: '多用途',
    description: '自然的波浪中长发为您带来柔美的轮廓，突出您的脸型优势。发尾的轻微层次与卵形脸非常相配，创造出平衡和谐的整体外观。'
  },
  {
    id: 3,
    name: '侧分长直发',
    image: 'https://images.unsplash.com/photo-1580501170888-80668882ca0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvbmclMjBoYWlyc3R5bGV8ZW58MHx8MHx8fDA%3D',
    matchScore: 85,
    style: '优雅',
    length: '长发',
    occasion: '正式',
    description: '侧分的长直发帮助修饰脸型，让您的五官更加突出。这种造型简洁但不失优雅，特别适合正式场合和职业环境。'
  },
];

const HairStyleRating: React.FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  // 假设的共享发型数据 - 实际应用中应该从API获取
  // 这里模拟一个由分享ID获取的共享发型列表
  const [sharedStyles, setSharedStyles] = useState<typeof hairstyleData>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 模拟API调用获取分享的发型数据
    // 实际应用中，应该根据shareId从后端获取数据
    setTimeout(() => {
      if (shareId === 'sample') {
        // 示例分享ID
        setSharedStyles(hairstyleData.slice(0, 3));
      } else {
        // 实际应用中应该处理无效的分享ID
        setSharedStyles(hairstyleData.slice(0, 2)); // 假设只分享了前两款
      }
      setLoading(false);
    }, 1000);
  }, [shareId]);

  const handleRatingChange = (id: number, value: number | null) => {
    if (value !== null) {
      setRatings({
        ...ratings,
        [id]: value
      });
    }
  };

  const handleCommentChange = (id: number, value: string) => {
    setComments({
      ...comments,
      [id]: value
    });
  };

  const handleSubmit = () => {
    if (!userName.trim()) {
      return;
    }

    setSubmitting(true);

    // 模拟提交到服务器
    setTimeout(() => {
      console.log('提交的评分数据:', {
        userName,
        ratings,
        comments
      });

      setSubmitting(false);
      setSubmitted(true);
      setSnackbarOpen(true);
    }, 1500);
  };

  if (loading) {
    return (
      <PageContainer title="发型评分">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <CircularProgress color="primary" />
          <Typography variant="body1" sx={{ mt: 2 }}>
            正在加载发型数据...
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  if (submitted) {
    return (
      <PageContainer title="评分已提交">
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            谢谢您的评分！
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            您的朋友将会收到您的评价结果。
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ borderRadius: 8, px: 4 }}
          >
            返回主页
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="发型评分">
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          为这些发型打分
        </Typography>
        <Typography variant="body2" color="text.secondary">
          您的朋友想听听您对这些发型的看法。请为每种发型评分并留下您的意见。
        </Typography>
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
        <Typography variant="body1" fontWeight="bold" mb={2}>
          您的姓名
        </Typography>
        <TextField
          fullWidth
          placeholder="请输入您的姓名"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}
          variant="outlined"
        />
      </Paper>

      {sharedStyles.map((style) => (
        <Card
          key={style.id}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            mb: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image={style.image}
            alt={style.name}
            sx={{ objectFit: 'cover' }}
          />
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              {style.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              {style.description}
            </Typography>
            
            <Divider sx={{ mb: 3 }} />
            
            <Typography variant="body1" fontWeight="bold" mb={1}>
              您的评分
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Rating
                value={ratings[style.id] || 0}
                onChange={(_, value) => handleRatingChange(style.id, value)}
                precision={0.5}
                size="large"
              />
              <Typography variant="body2" color="text.secondary" ml={2}>
                {ratings[style.id] ? `${ratings[style.id]} / 5` : '点击评分'}
              </Typography>
            </Box>
            
            <Typography variant="body1" fontWeight="bold" mb={1}>
              您的评论
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="写下您对这款发型的看法，帮助您的朋友做出选择..."
              value={comments[style.id] || ''}
              onChange={(e) => handleCommentChange(style.id, e.target.value)}
              sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}
              variant="outlined"
            />
          </Box>
        </Card>
      ))}

      <PrimaryButton
        onClick={handleSubmit}
        disabled={!userName.trim() || submitting || Object.keys(ratings).length === 0}
        endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
      >
        {submitting ? '提交中...' : '提交评分'}
      </PrimaryButton>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          评分已成功提交！
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default HairStyleRating; 