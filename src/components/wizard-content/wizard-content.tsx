import React from 'react';
import {
  DialogContent,
  DialogContentProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialogContent = styled(DialogContent, {
  name: 'WmeWizardContent',
  slot: 'Content',
})<DialogContentProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  zIndex: '1',
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(4),
  marginBottom: 0,
  marginLeft: theme.spacing(4),
}));

export default function WizardContent(props: DialogContentProps) {
  const { children, ...rest } = props;
  return <StyledDialogContent {...rest}>{children}</StyledDialogContent>;
}
