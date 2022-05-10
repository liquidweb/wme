import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogProps,
  DialogContent,
} from '@mui/material';

interface WmeDialogProps extends DialogProps {
  children?: ReactNode;
}

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
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Wizard;
