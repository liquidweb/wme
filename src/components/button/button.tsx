import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ButtonProps extends MuiButtonProps {
    color?: 'primary' | 'secondary'| 'inherit';
    variant?: 'outlined' | 'contained' | 'text';
}

const StyledButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
  textTransform: 'none',
  padding: '6px 12px',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
  '&.MuiButton-contained&.Mui-disabled': {
    backgroundColor: theme.palette.text.placeholder,
    color: theme.palette.text.white,
  },
  '&.MuiButton-text': {
    color: theme.palette.text.primary,
    '&:focus, &:hover': {
      backgroundColor: theme.palette.background.hover,
    },
  },
  '&.MuiButton-text&.Mui-disabled': {
    backgroundColor: 'transparent',
    color: theme.palette.text.placeholder,
  },
  '&.MuiButton-outlined&.Mui-disabled': {
    backgroundColor: 'transparent',
    color: theme.palette.text.placeholder,
  },
}));

const Button: React.FC<ButtonProps> = (props) => <StyledButton {...props} />;

export default Button;
