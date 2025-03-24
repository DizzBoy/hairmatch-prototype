import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      sx={{
        py: 1.5,
        borderRadius: 8,
        textTransform: 'none',
        fontSize: '1rem',
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton; 