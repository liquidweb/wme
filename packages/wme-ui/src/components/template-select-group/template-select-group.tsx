import type React from 'react';
import {
  styled,
  Box,
  BoxProps,
} from '@mui/material';

const TemplateGroupContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'auto auto',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'auto auto auto',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'auto auto auto auto',
  },
}));

export default function TemplateSelectGroup(props: BoxProps) {
  return (
    <TemplateGroupContainer {...props} />
  );
}
