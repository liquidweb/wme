import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const WmeInputTitle = styled(Typography, {
  name: 'WmeInputTitle',
  slot: 'Root',
})(({ theme }) => ({
  fontWeight: '600',
  fontSize: 14,
  marginBottom: 5,
  color: theme.palette.text.primary,
}));

const InputTitle: React.FC = (props) => {
  const { children } = props;
  return (
    <WmeInputTitle>
      {children}
    </WmeInputTitle>
  );
};

export default InputTitle;
