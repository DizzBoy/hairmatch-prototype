import React, { useState } from 'react';
import { Box, Typography, Paper, Card, CardMedia, Grid, Chip, IconButton, Divider, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
    description: '这款短发造型轻盈活泼，突出脸部轮廓，适合您的卵形脸型。发丝的层次感为整体增添了活力，同时不会让脸部看起来过宽。'
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

type FilterType = 'length' | 'style' | 'occasion';

const HairStyleRecommendation: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filters, setFilters] = useState<{[key in FilterType]: string | null}>({
    length: null,
    style: null,
    occasion: null
  });

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleStyleClick = (id: number) => {
    navigate(`/preview/${id}`);
  };

  const toggleFilter = (type: FilterType, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  const filteredStyles = hairstyleData.filter(style => {
    return (
      (filters.length === null || style.length === filters.length) &&
      (filters.style === null || style.style === filters.style) &&
      (filters.occasion === null || style.occasion === filters.occasion)
    );
  });

  return (
    <PageContainer title="推荐发型" showBackButton>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          适合您的发型推荐
        </Typography>
        <Typography variant="body2" color="text.secondary">
          基于您的脸型分析，我们推荐以下发型。点击任意发型查看效果。
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: 4,
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold">
            筛选条件
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" mb={1}>长度</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label="短发" 
              onClick={() => toggleFilter('length', '短发')}
              color={filters.length === '短发' ? 'primary' : 'default'}
              variant={filters.length === '短发' ? 'filled' : 'outlined'}
            />
            <Chip 
              label="中长发" 
              onClick={() => toggleFilter('length', '中长发')}
              color={filters.length === '中长发' ? 'primary' : 'default'}
              variant={filters.length === '中长发' ? 'filled' : 'outlined'}
            />
            <Chip 
              label="长发" 
              onClick={() => toggleFilter('length', '长发')}
              color={filters.length === '长发' ? 'primary' : 'default'}
              variant={filters.length === '长发' ? 'filled' : 'outlined'}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" mb={1}>风格</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label="时尚" 
              onClick={() => toggleFilter('style', '精致时尚')}
              color={filters.style === '精致时尚' ? 'primary' : 'default'}
              variant={filters.style === '精致时尚' ? 'filled' : 'outlined'}
            />
            <Chip 
              label="浪漫" 
              onClick={() => toggleFilter('style', '浪漫')}
              color={filters.style === '浪漫' ? 'primary' : 'default'}
              variant={filters.style === '浪漫' ? 'filled' : 'outlined'}
            />
            <Chip 
              label="优雅" 
              onClick={() => toggleFilter('style', '优雅')}
              color={filters.style === '优雅' ? 'primary' : 'default'}
              variant={filters.style === '优雅' ? 'filled' : 'outlined'}
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="body2" mb={1}>场合</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label="日常" 
              onClick={() => toggleFilter('occasion', '日常')}
              color={filters.occasion === '日常' ? 'primary' : 'default'}
              variant={filters.occasion === '日常' ? 'filled' : 'outlined'}
            />
            <Chip 
              label="多用途" 
              onClick={() => toggleFilter('occasion', '多用途')}
              color={filters.occasion === '多用途' ? 'primary' : 'default'}
              variant={filters.occasion === '多用途' ? 'filled' : 'outlined'}
            />
            <Chip 
              label="正式" 
              onClick={() => toggleFilter('occasion', '正式')}
              color={filters.occasion === '正式' ? 'primary' : 'default'}
              variant={filters.occasion === '正式' ? 'filled' : 'outlined'}
            />
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {filteredStyles.map((style) => (
          <Grid item xs={12} key={style.id}>
            <Card
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                mb: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={style.image}
                  alt={style.name}
                  sx={{ objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => handleStyleClick(style.id)}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  }}
                  onClick={() => toggleFavorite(style.id)}
                >
                  {favorites.includes(style.id) ? (
                    <FavoriteIcon sx={{ color: '#ff6b81' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: 'white' }} />
                  )}
                </IconButton>
              </Box>

              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {style.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary" mr={1}>
                      匹配度:
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {style.matchScore}%
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip label={style.length} size="small" />
                  <Chip label={style.style} size="small" />
                  <Chip label={style.occasion} size="small" />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary">
                  {style.description}
                </Typography>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Rating value={style.matchScore / 20} precision={0.5} readOnly />
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => handleStyleClick(style.id)}
                  >
                    查看效果 →
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default HairStyleRecommendation; 