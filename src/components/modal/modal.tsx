import React, { ReactNode } from 'react';
import {
  Dialog, DialogProps, DialogContent, DialogContentProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WmeDialogProps extends DialogProps {
  children?: ReactNode;
}

const StyledModal = styled(Dialog, {
  name: 'WmeDialog',
  slot: 'Root',
})(() => ({
  zIndex: 99999,

  '& .MuiDialogContent-root': {
    minHeight: 'calc(100vh - 200px)',
  },
}));

const Modal: React.FC<WmeDialogProps> = (props) => {
  const {
    children,
    ...rest
  } = props;

  return (
    <StyledModal
      fullScreen
      fullWidth
      {...rest}
    >
      <DialogContent>
        {children}
      </DialogContent>
    </StyledModal>
  );
};

export default Modal;
