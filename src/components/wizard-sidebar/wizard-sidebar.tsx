import React from 'react';
import {
  Box,
  BoxProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledWizardSidebar = styled(Box, {
  name: 'WmeWizardContent',
  slot: 'Sidebar',
})<BoxProps>(({ theme }) => ({
  padding: theme.spacing(4),
  background: theme.palette.background.grey,
}));

export default function WizardSidebar(props: BoxProps) {
  const { children, ...rest } = props;
  return <StyledWizardSidebar {...rest}>{children}</StyledWizardSidebar>;
}
