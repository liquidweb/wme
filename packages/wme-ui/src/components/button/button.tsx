import type React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface WmeButtonProps extends ButtonProps {
  component?: string;
}

const StyledButton = styled(MuiButton, {
  name: 'WmeButton',
  slot: 'Root',
})(({ theme }) => ({
  textTransform: 'none',
  padding: '12px 32px',
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
  '&.MuiButton-outlinedPrimary': {
    '&:focus, &:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.white,
    },
  },
}));

const Button: React.FC<WmeButtonProps> = (props) => (
  <StyledButton className="WmeButton-root" {...props} />
);

export default Button;
