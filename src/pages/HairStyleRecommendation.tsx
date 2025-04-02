import React, { useState } from 'react';
import { Box, Typography, Paper, Card, CardMedia, Grid, Chip, IconButton, Divider, Rating, Checkbox, Button, Snackbar, Alert, Fab, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, TextField, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeIcon from '@mui/icons-material/QrCode';

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
  const [selectedStyles, setSelectedStyles] = useState<number[]>([]);
  const [shareSnackbarOpen, setShareSnackbarOpen] = useState(false);
  const [filters, setFilters] = useState<{[key in FilterType]: string | null}>({
    length: null,
    style: null,
    occasion: null
  });
  
  // 新增状态
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [shareResultDialogOpen, setShareResultDialogOpen] = useState(false);
  const [shareNote, setShareNote] = useState("");

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleStyleClick = (id: number) => {
    if (isBatchMode) {
      toggleStyleSelection(id);
    } else {
      navigate(`/preview/${id}`);
    }
  };

  const toggleFilter = (type: FilterType, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  const toggleStyleSelection = (id: number) => {
    if (selectedStyles.includes(id)) {
      setSelectedStyles(selectedStyles.filter(styleId => styleId !== id));
    } else {
      setSelectedStyles([...selectedStyles, id]);
    }
  };

  // 进入批量选择模式
  const enterBatchMode = () => {
    setIsBatchMode(true);
  };

  // 退出批量选择模式
  const exitBatchMode = () => {
    setIsBatchMode(false);
    setSelectedStyles([]);
  };

  // 全选
  const selectAll = () => {
    setSelectedStyles(filteredStyles.map(style => style.id));
  };

  // 取消全选
  const deselectAll = () => {
    setSelectedStyles([]);
  };

  const handleShareSelected = () => {
    if (selectedStyles.length === 0) {
      return;
    }
    
    setShareDialogOpen(true);
  };
  
  // 生成分享链接
  const generateShareLink = () => {
    setIsGeneratingLink(true);
    
    // 模拟生成分享链接的过程
    setTimeout(() => {
      const shareId = Math.random().toString(36).substring(2, 10);
      setShareLink(`https://umax.app/share/${shareId}`);
      setIsGeneratingLink(false);
    }, 1000);
  };
  
  // 复制分享链接
  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    setShareSnackbarOpen(true);
  };
  
  // 关闭分享对话框并打开结果对话框
  const completeSharing = () => {
    setShareDialogOpen(false);
    setShareResultDialogOpen(true);
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

      {!isBatchMode ? (
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
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 4,
            bgcolor: 'rgba(156, 110, 255, 0.1)',
            border: '1px solid #9c6eff'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              批量选择模式
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                variant="outlined" 
                color="primary"
                onClick={selectAll}
              >
                全选
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                color="primary"
                onClick={deselectAll}
              >
                取消全选
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                color="error"
                onClick={exitBatchMode}
                startIcon={<CloseIcon />}
              >
                退出
              </Button>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            点击发型卡片可选择或取消选择。选择完成后点击下方分享按钮。
          </Typography>
        </Paper>
      )}

      {isBatchMode && selectedStyles.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body1">
            已选择 {selectedStyles.length} 款发型
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<ShareIcon />}
            onClick={handleShareSelected}
            sx={{ borderRadius: 8 }}
          >
            分享给朋友评分
          </Button>
        </Box>
      )}

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
                border: selectedStyles.includes(style.id) ? '2px solid #9c6eff' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                bgcolor: selectedStyles.includes(style.id) ? 'rgba(156, 110, 255, 0.05)' : 'background.paper',
              }}
              onClick={() => handleStyleClick(style.id)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={style.image}
                  alt={style.name}
                  sx={{ objectFit: 'cover' }}
                />
                <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                  <IconButton
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.5)',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(style.id);
                    }}
                  >
                    {favorites.includes(style.id) ? (
                      <FavoriteIcon sx={{ color: '#ff6b81' }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: 'white' }} />
                    )}
                  </IconButton>
                  {isBatchMode && (
                    <IconButton
                      sx={{
                        bgcolor: selectedStyles.includes(style.id) ? 'primary.main' : 'rgba(0,0,0,0.5)',
                        '&:hover': { bgcolor: selectedStyles.includes(style.id) ? 'primary.dark' : 'rgba(0,0,0,0.7)' },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStyleSelection(style.id);
                      }}
                    >
                      {selectedStyles.includes(style.id) ? (
                        <CheckBoxIcon sx={{ color: 'white' }} />
                      ) : (
                        <CheckBoxOutlineBlankIcon sx={{ color: 'white' }} />
                      )}
                    </IconButton>
                  )}
                </Box>
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
                  {isBatchMode && (
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon />}
                      checkedIcon={<CheckBoxIcon />}
                      checked={selectedStyles.includes(style.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleStyleSelection(style.id);
                      }}
                      sx={{ color: selectedStyles.includes(style.id) ? 'primary.main' : undefined }}
                    />
                  )}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 批量分享浮动按钮 */}
      {!isBatchMode && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
            }}
          >
            让朋友帮你选择
          </Typography>
          <Fab 
            color="primary" 
            aria-label="批量分享" 
            onClick={enterBatchMode}
            sx={{ 
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              width: 56,
              height: 56,
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
              }
            }}
          >
            <ShareIcon />
          </Fab>
        </Box>
      )}

      {/* 分享对话框 */}
      <Dialog 
        open={shareDialogOpen} 
        onClose={() => setShareDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>分享发型</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              你将分享 {selectedStyles.length} 款发型给朋友，让他们帮你评分选择
            </Typography>
            
            <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
              添加留言（可选）:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              placeholder="例如：帮我看看哪个发型更适合我参加婚礼"
              value={shareNote}
              onChange={(e) => setShareNote(e.target.value)}
              sx={{ mb: 3 }}
            />

            {!shareLink ? (
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={generateShareLink}
                disabled={isGeneratingLink}
                startIcon={isGeneratingLink ? <CircularProgress size={20} /> : <QrCodeIcon />}
                sx={{ borderRadius: 8, py: 1.5 }}
              >
                {isGeneratingLink ? '生成中...' : '生成分享链接'}
              </Button>
            ) : (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  分享链接:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={shareLink}
                    InputProps={{
                      readOnly: true,
                    }}
                    size="small"
                  />
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={copyShareLink}
                    sx={{ minWidth: 'auto', borderRadius: 2 }}
                  >
                    <ContentCopyIcon />
                  </Button>
                </Box>
              </Box>
            )}
            
            {shareLink && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  选择分享方式:
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<WhatsAppIcon />}
                    onClick={completeSharing}
                    sx={{ borderRadius: 8, flex: 1, mr: 1 }}
                  >
                    WhatsApp
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>取消</Button>
          {shareLink && (
            <Button onClick={completeSharing} variant="contained" color="primary">
              完成
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* 分享结果对话框 */}
      <Dialog 
        open={shareResultDialogOpen} 
        onClose={() => setShareResultDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>分享成功</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🎉 已成功分享 {selectedStyles.length} 款发型！
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                component="img"
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example"
                alt="QR Code"
                sx={{ width: 150, height: 150 }}
              />
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              你的朋友可以通过链接或扫描二维码进行查看和评分。
              当他们完成评分后，你将收到通知。
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
              已分享的发型:
            </Typography>
            
            <List sx={{ bgcolor: 'background.paper' }}>
              {selectedStyles.map(id => {
                const style = hairstyleData.find(s => s.id === id);
                if (!style) return null;
                
                return (
                  <ListItem key={style.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar src={style.image} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={style.name} 
                      secondary={`匹配度: ${style.matchScore}%`} 
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShareResultDialogOpen(false);
            exitBatchMode();
          }}>
            关闭
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              navigate('/rating-results/sample');
            }}
          >
            查看评分结果
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={shareSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setShareSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShareSnackbarOpen(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          分享链接已复制到剪贴板！
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default HairStyleRecommendation; 