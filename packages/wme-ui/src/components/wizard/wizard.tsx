import React, {
  ReactNode,
  ReactElement,
  forwardRef,
  Ref,
} from 'react';
import {
  Dialog,
  DialogProps,
  DialogContent,
  Box,
  Paper,
  PaperProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WmePaperProps extends PaperProps {
  ref?: Ref<HTMLDivElement>;
}

interface WmeDialogProps extends DialogProps {
  children?: ReactNode;
  bgStyles?: {};
  logoSrc?: string;
  logoAlt?: string;
  exit?: ReactElement;
  PaperProps?: WmePaperProps;
}

const StyledDialogContent = styled(DialogContent, {
  name: 'WmeWizard',
  slot: 'DialogContent',
})(() => ({
  padding: '16px 32px',
  overflowY: 'auto',
  overflowX: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const PaperComponent = forwardRef((props: WmePaperProps, ref: Ref<HTMLDivElement>) => (
  <Paper ref={ref} {...props} />
));

const Wizard = forwardRef((props: WmeDialogProps, ref: Ref<HTMLDivElement>) => {
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
      PaperComponent={PaperComponent}
      PaperProps={{ ref }}
    >
      <Box sx={{ ...bgStyles }}>
        <StyledDialogContent className="WmeWizard-dialogContent">
          {children}
        </StyledDialogContent>
      </Box>
    </Dialog>
  );
});

export default Wizard;
