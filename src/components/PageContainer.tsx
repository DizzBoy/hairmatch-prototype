import React, { ReactNode } from 'react';
import { Box, Container, IconButton, Typography, AppBar, Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  fullWidth?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  showBackButton = false,
  fullWidth = false,
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      {title && (
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            {showBackButton && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => navigate(-1)}
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <Container maxWidth={fullWidth ? false : "sm"} sx={{ flex: 1, py: 2 }}>
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer; 