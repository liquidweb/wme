import React, { ReactNode, ReactElement } from 'react';
import {
  Dialog,
  DialogProps,
  DialogContent,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WmeDialogProps extends DialogProps {
  children?: ReactNode;
  bgStyles?: {};
  logoSrc?: string;
  logoAlt?: string;
  exit?: ReactElement;
}

const StyledDialogContent = styled(DialogContent, {
  name: 'WmeWizard',
  slot: 'DialogContent',
})(() => ({
  margin: '16px 32px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const Wizard: React.FC<WmeDialogProps> = (props) => {
  const {
    children,
    bgStyles,
    logoSrc,
    logoAlt,
    exit,
    ...rest
  } = props;

  return (
    <Dialog
      fullScreen
      fullWidth
      {...rest}
    >
      <Box sx={{ ...bgStyles }}>
        <StyledDialogContent>
          {children}
        </StyledDialogContent>
      </Box>
    </Dialog>
  );
};

export default Wizard;
