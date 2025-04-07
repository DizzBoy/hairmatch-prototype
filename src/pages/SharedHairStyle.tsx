import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  Rating, 
  Divider, 
  Paper, 
  TextField, 
  CircularProgress, 
  Chip, 
  Avatar, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import PrimaryButton from '../components/PrimaryButton';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

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

interface ShareData {
  id: string;
  userName: string;
  userAvatar: string | null;
  message: string;
  styles: typeof hairstyleData;
  createdAt: string;
}

const SharedHairStyle: React.FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [shareData, setShareData] = useState<ShareData | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [comment, setComment] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  useEffect(() => {
    // 模拟API调用获取分享数据
    setTimeout(() => {
      // 假设的分享数据
      const mockShareData: ShareData = {
        id: shareId || 'sample',
        userName: '张小美',
        userAvatar: null,
        message: '大家好！我正在考虑换发型，请帮我看看哪一款更适合我？感谢你们的建议！',
        styles: hairstyleData,
        createdAt: '2023-03-25',
      };
      
      setShareData(mockShareData);
      setLoading(false);
    }, 1000);
  }, [shareId]);

  const handleRatingChange = (id: number, value: number | null) => {
    if (value !== null) {
      setRatings({
        ...ratings,
        [id]: value
      });

      // 如果用户给出高评分 (4星或以上)，弹出评论对话框
      if (value >= 4 && !openDialog) {
        setSelectedStyle(id);
        setOpenDialog(true);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitRating = () => {
    if (!userName.trim()) {
      setSnackbarMessage('请输入您的姓名');
      setSnackbarOpen(true);
      return;
    }

    setSubmitting(true);

    // 模拟提交到服务器
    setTimeout(() => {
      console.log('提交的评分数据:', {
        userName,
        ratings,
        comment,
        shareId
      });

      setSubmitting(false);
      navigate(`/rate/${shareId}`);
    }, 1500);
  };

  const handleCopyShareLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setSnackbarMessage('链接已复制到剪贴板');
      setSnackbarOpen(true);
    });
  };

  const handleSubmitComment = () => {
    handleCloseDialog();
    setSnackbarMessage('感谢您的评价！');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <PageContainer title="发型分享">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <CircularProgress color="primary" />
          <Typography variant="body1" sx={{ mt: 2 }}>
            正在加载分享内容...
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  if (!shareData) {
    return (
      <PageContainer title="发型分享">
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            找不到分享内容
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            此分享链接无效或已过期。
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="发型分享" fullWidth>
      {/* 顶部用户分享信息 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 4,
          bgcolor: 'background.paper',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: 2 }}
          >
            {shareData.userAvatar ? (
              <img src={shareData.userAvatar} alt={shareData.userName} />
            ) : (
              <PersonIcon />
            )}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {shareData.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              想听听您对这些发型的看法
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
          "{shareData.message}"
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            icon={<ShareIcon fontSize="small" />} 
            label="分享这个页面" 
            variant="outlined" 
            onClick={handleCopyShareLink}
            sx={{ borderRadius: 8 }}
          />
        </Box>
      </Paper>

      {/* 姓名输入 */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
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
          sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}
          variant="outlined"
        />
      </Paper>

      {/* 发型展示和评分区域 */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        为这些发型打分
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        请滑动星星来评价每款发型，您的反馈对{shareData.userName}很重要。
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {shareData.styles.map((style) => (
          <Card
            key={style.id}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <CardMedia
              component="img"
              height="280"
              image={style.image}
              alt={style.name}
              sx={{ objectFit: 'cover' }}
            />
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {style.name}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip label={style.style} size="small" sx={{ borderRadius: 4 }} />
                <Chip label={style.length} size="small" sx={{ borderRadius: 4 }} />
                <Chip label={style.occasion} size="small" sx={{ borderRadius: 4 }} />
              </Box>
              <Typography variant="body2" color="text.secondary" mb={3}>
                {style.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" fontWeight="bold" mb={1}>
                这款发型适合{shareData.userName}吗？
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 2, minWidth: '50px' }}>
                  {ratings[style.id] ? '您的评分:' : '请评分:'}
                </Typography>
                <Rating
                  name={`rating-${style.id}`}
                  value={ratings[style.id] || null}
                  onChange={(_, value) => handleRatingChange(style.id, value)}
                  precision={1}
                  size="large"
                  sx={{ color: 'primary.main' }}
                />
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* 提交按钮 */}
      <Box sx={{ my: 4 }}>
        <PrimaryButton 
          onClick={handleSubmitRating}
          disabled={submitting || Object.keys(ratings).length === 0 || !userName.trim()}
        >
          {submitting ? '提交中...' : '提交评分'}
        </PrimaryButton>
      </Box>

      {/* 评论对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          添加评价
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            您对这款发型有什么建议或评价？
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="评价内容"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="例如：这款发型很适合你的脸型，会凸显你的五官优势..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>跳过</Button>
          <Button onClick={handleSubmitComment} variant="contained" color="primary">
            提交评价
          </Button>
        </DialogActions>
      </Dialog>

      {/* 通知消息 */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default SharedHairStyle; 