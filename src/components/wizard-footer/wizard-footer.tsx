import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledWizardFooter = styled(Box, {
  name: 'WmeWizardFooter',
  slot: 'Root',
})<BoxProps>(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: theme.spacing(4),
  right: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function WizardFooter(props: BoxProps) {
  const { children, ...rest } = props;
  return <StyledWizardFooter {...rest}>{children}</StyledWizardFooter>;
}
