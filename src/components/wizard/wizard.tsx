import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogProps,
  DialogContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WmeDialogProps extends DialogProps {
  children?: ReactNode;
}

const StyledDialogContent = styled(DialogContent, {
  name: 'WmeDialogContent',
  slot: 'Root',
})(() => ({
  margin: '16px 32px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const Wizard: React.FC<WmeDialogProps> = (props) => {
  const {
    children,
    ...rest
  } = props;

  return (
    <Dialog
      fullScreen
      fullWidth
      {...rest}
    >
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
    </Dialog>
  );
};

export default Wizard;
