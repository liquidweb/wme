import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import SyncIcon from '@mui/icons-material/Sync';

const StyledLoader = styled(SyncIcon, {
  name: 'WmeLoader',
  slot: 'Root',
})(() => ({
  animation: 'spin 1s infinite linear',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(-360deg)',
    },
  },
}));

export default function Loader() {
  return (
    <StyledLoader className="WmePill-root" />
  );
}
