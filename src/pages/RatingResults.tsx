import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Paper, Card, CardMedia, Divider, Rating, List, ListItem, ListItemAvatar, Avatar, ListItemText, CircularProgress, Chip, Tab, Tabs, Button, IconButton, LinearProgress, Grid } from '@mui/material';
import PageContainer from '../components/PageContainer';
import PrimaryButton from '../components/PrimaryButton';
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BarChartIcon from '@mui/icons-material/BarChart';

// 假设的发型数据
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

// 假设的评分数据
interface Rating {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface HairstyleWithRatings {
  style: typeof hairstyleData[0];
  ratings: Rating[];
  averageRating: number;
  ratingCounts: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

interface ShareStatus {
  shareId: string;
  createdAt: string;
  totalViews: number;
  totalRatings: number;
  pendingRatings: number;
  completedPercentage: number;
  friendsInvited: string[];
  friendsCompleted: string[];
}

const RatingResults: React.FC = () => {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [ratedStyles, setRatedStyles] = useState<HairstyleWithRatings[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [shareStatus, setShareStatus] = useState<ShareStatus | null>(null);
  const [showAllRatings, setShowAllRatings] = useState<{[key: number]: boolean}>({});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const toggleShowAllRatings = (styleId: number) => {
    setShowAllRatings(prev => ({
      ...prev,
      [styleId]: !prev[styleId]
    }));
  };

  const handleViewStyle = (styleId: number) => {
    navigate(`/preview/${styleId}`);
  };

  useEffect(() => {
    // 模拟从API获取评分数据
    setTimeout(() => {
      // 假设的评分数据（在实际应用中应该从API获取）
      const mockRatings: { [key: number]: Rating[] } = {
        1: [
          { id: 1, userName: '张三', rating: 4.5, comment: '这款发型很适合你，显得年轻有活力！我觉得非常适合你日常使用。', date: '2023-03-24' },
          { id: 2, userName: '李四', rating: 5, comment: '绝对是最适合你的款式，突出了你的脸型优势，气质一下提升了！', date: '2023-03-23' },
          { id: 3, userName: '王五', rating: 4, comment: '我觉得还不错，很精致，适合工作场合。', date: '2023-03-22' },
        ],
        2: [
          { id: 4, userName: '赵六', rating: 3.5, comment: '中规中矩，波浪感可以再强一些会更好。', date: '2023-03-24' },
          { id: 5, userName: '钱七', rating: 4, comment: '这款很适合你，柔和了你的脸型，显得温柔。', date: '2023-03-23' },
        ],
        3: [
          { id: 6, userName: '孙八', rating: 3, comment: '太长了，不太建议，会显得脸大。', date: '2023-03-24' },
          { id: 7, userName: '周九', rating: 3.5, comment: '比较适合正式场合，日常可能不太方便打理。', date: '2023-03-23' },
        ],
      };

      // 计算每个评分的数量分布
      const getRatingCounts = (ratings: Rating[]) => {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        ratings.forEach(rating => {
          const score = Math.floor(rating.rating);
          counts[score as keyof typeof counts] += 1;
        });
        return counts;
      };

      // 计算平均评分并排序
      const result = hairstyleData.map(style => {
        const styleRatings = mockRatings[style.id] || [];
        const sum = styleRatings.reduce((acc, curr) => acc + curr.rating, 0);
        const average = styleRatings.length ? sum / styleRatings.length : 0;
        
        return {
          style,
          ratings: styleRatings,
          averageRating: parseFloat(average.toFixed(1)),
          ratingCounts: getRatingCounts(styleRatings)
        };
      });

      // 按平均评分排序
      const sorted = result.sort((a, b) => b.averageRating - a.averageRating);
      setRatedStyles(sorted);

      // 模拟分享状态数据
      const mockShareStatus: ShareStatus = {
        shareId: 'sample',
        createdAt: '2023-03-22 15:30',
        totalViews: 12,
        totalRatings: 7,
        pendingRatings: 5,
        completedPercentage: 58,
        friendsInvited: ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '王十二'],
        friendsCompleted: ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九']
      };
      setShareStatus(mockShareStatus);
      setLoading(false);
    }, 1500);
  }, [shareId]);

  const handleBackToRecommendations = () => {
    navigate('/recommendation');
  };

  const handleShareAgain = () => {
    navigate('/recommendation');
  };

  if (loading) {
    return (
      <PageContainer title="评分结果" showBackButton>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <CircularProgress color="primary" />
          <Typography variant="body1" sx={{ mt: 2 }}>
            正在加载评分结果...
          </Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="发型评分结果" showBackButton>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          朋友评分结果
        </Typography>
        <Typography variant="body2" color="text.secondary">
          以下是朋友对您分享的发型的评分结果，按评分高低排序。
        </Typography>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="评分结果" icon={<StarIcon />} iconPosition="start" />
          <Tab label="分享状态" icon={<BarChartIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <>
          {ratedStyles.length > 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 4,
                bgcolor: ratedStyles[0].averageRating >= 4 ? 'rgba(156, 110, 255, 0.1)' : 'background.paper',
                border: ratedStyles[0].averageRating >= 4 ? '1px solid rgba(156, 110, 255, 0.3)' : 'none',
                position: 'relative'
              }}
            >
              {ratedStyles[0].averageRating >= 4 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -15,
                    right: 20,
                    bgcolor: '#9c6eff',
                    color: 'white',
                    borderRadius: 16,
                    px: 2,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <EmojiEventsIcon fontSize="small" />
                  <Typography variant="body2" fontWeight="bold">
                    最高评分
                  </Typography>
                </Box>
              )}
              
              <Typography variant="h6" fontWeight="bold" mb={2}>
                综合评分结果
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                根据朋友的评分，"{ratedStyles[0].style.name}"获得了最高评分，获得了平均{ratedStyles[0].averageRating}分（满分5分）。
                共有{ratedStyles[0].ratings.length}位朋友进行了评价。
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => handleViewStyle(ratedStyles[0].style.id)}
                  sx={{ borderRadius: 8, px: 3 }}
                >
                  查看最高评分发型
                </Button>
              </Box>
            </Paper>
          )}

          {ratedStyles.map((item, index) => (
            <Card
              key={item.style.id}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                mb: 4,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: index === 0 ? '2px solid #9c6eff' : 'none',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <CardMedia
                  component="img"
                  sx={{ 
                    width: { xs: '100%', sm: 200 }, 
                    height: { xs: 200, sm: 'auto' },
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  image={item.style.image}
                  alt={item.style.name}
                  onClick={() => handleViewStyle(item.style.id)}
                />
                <Box sx={{ p: 3, flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.style.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        {item.averageRating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" ml={1}>
                        / 5
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Rating value={item.averageRating} precision={0.5} readOnly />
                    <Chip 
                      size="small" 
                      label={`${item.ratings.length} 条评价`} 
                      sx={{ ml: 2, bgcolor: 'rgba(0,0,0,0.06)' }} 
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    {[5, 4, 3, 2, 1].map((star) => (
                      <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: 40 }}>
                          <Typography variant="body2" color="text.secondary" mr={0.5}>
                            {star}
                          </Typography>
                          <StarIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                        </Box>
                        <Box sx={{ flex: 1, mx: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={item.ratings.length ? (item.ratingCounts[star as keyof typeof item.ratingCounts] / item.ratings.length) * 100 : 0}
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              bgcolor: 'rgba(0,0,0,0.05)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: star >= 4 ? '#9c6eff' : star >= 3 ? '#ffab40' : '#f44336'
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ width: 30, textAlign: 'right' }}>
                          {item.ratingCounts[star as keyof typeof item.ratingCounts]}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    朋友评价
                  </Typography>
                  
                  <List sx={{ bgcolor: 'background.paper', p: 0 }}>
                    {(showAllRatings[item.style.id] ? item.ratings : item.ratings.slice(0, 2)).map((rating) => (
                      <ListItem key={rating.id} alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" fontWeight="bold" mr={1}>{rating.userName}</Typography>
                            <Rating value={rating.rating} size="small" readOnly />
                          </Box>}
                          secondary={
                            <React.Fragment>
                              <Typography variant="body2" color="text.secondary" component="span">
                                {rating.comment}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                                {rating.date}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    ))}
                    
                    {item.ratings.length > 2 && (
                      <Typography 
                        variant="body2" 
                        color="primary" 
                        sx={{ mt: 1, cursor: 'pointer' }}
                        onClick={() => toggleShowAllRatings(item.style.id)}
                      >
                        {showAllRatings[item.style.id] ? '收起' : `查看全部 ${item.ratings.length} 条评价`}
                      </Typography>
                    )}
                  </List>
                </Box>
              </Box>

              <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => handleViewStyle(item.style.id)}
                  sx={{ borderRadius: 8 }}
                >
                  查看详情
                </Button>
              </Box>
            </Card>
          ))}
        </>
      )}

      {activeTab === 1 && shareStatus && (
        <Box>
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
              分享状态概览
            </Typography>
            
            <Grid container spacing={3} mb={3}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">分享时间</Typography>
                  <Typography variant="h6" fontWeight="bold" mt={1}>{shareStatus.createdAt}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">邀请好友</Typography>
                  <Typography variant="h6" fontWeight="bold" mt={1}>{shareStatus.friendsInvited.length}人</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">查看人数</Typography>
                  <Typography variant="h6" fontWeight="bold" mt={1}>{shareStatus.totalViews}人</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, border: '1px solid rgba(0,0,0,0.1)', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary">评分人数</Typography>
                  <Typography variant="h6" fontWeight="bold" mt={1}>{shareStatus.totalRatings}人</Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" fontWeight="bold">
                  评分完成情况
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shareStatus.completedPercentage}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={shareStatus.completedPercentage}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="body2" color="text.secondary" mt={1}>
                还有 {shareStatus.pendingRatings} 人未完成评分
              </Typography>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              朋友参与状态
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {shareStatus.friendsInvited.map((friend, index) => {
                const hasCompleted = shareStatus.friendsCompleted.includes(friend);
                return (
                  <Chip
                    key={index}
                    label={friend}
                    icon={hasCompleted ? <CheckCircleIcon /> : <HourglassEmptyIcon />}
                    color={hasCompleted ? "primary" : "default"}
                    variant={hasCompleted ? "filled" : "outlined"}
                  />
                );
              })}
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShareIcon />}
                onClick={handleShareAgain}
                sx={{ borderRadius: 8, px: 3 }}
              >
                重新分享
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <PrimaryButton onClick={handleBackToRecommendations}>
          返回发型推荐
        </PrimaryButton>
      </Box>
    </PageContainer>
  );
};

export default RatingResults; 