import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface InputTitleProps {
  children: string;
}

const StyledInputTitle = styled(Typography, {
  name: 'WmeInputTitle',
  slot: 'Root',
})(({ theme }) => ({
  fontWeight: '600',
  fontSize: 14,
  marginBottom: 5,
  color: theme.palette.text.primary,
  textAlign: 'left',
}));

const InputTitle: React.FC<InputTitleProps> = (props) => {
  const { children } = props;
  const { displayName } = StyledInputTitle;
  return (
    <StyledInputTitle className={displayName}>
      {children}
    </StyledInputTitle>
  );
};

export default InputTitle;