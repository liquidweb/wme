import React from 'react';
import {
  Dialog,
  DialogProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog, {
  name: 'WmeWizard',
  slot: 'Root',
})<DialogProps>(() => ({
  zIndex: 9999,
}));

export default function Wizard(props: DialogProps) {
  const { children, ...rest } = props;
  return <StyledDialog fullScreen {...rest}>{children}</StyledDialog>;
}
