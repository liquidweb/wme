import type React from 'react';
import { styled, Box, BoxProps } from '@mui/material';

const TemplateGroupContainer = styled(Box, {
  name: 'WmeTemplateGroup',
  slot: 'Root',
})<BoxProps>(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr 1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
}));

export default function TemplateSelectGroup(props: BoxProps) {
  return <TemplateGroupContainer {...props} />;
}
