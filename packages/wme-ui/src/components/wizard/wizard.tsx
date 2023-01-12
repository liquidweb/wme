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
  Grid,
  Paper,
  PaperProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { WizardFooter, WizardSidebar } from '..';
import type { WizardSidebarProps } from '../wizard-sidebar/wizard-sidebar';
import type { WizardFooterProps } from '../wizard-footer/wizard-footer';

interface WmePaperProps extends PaperProps {
  ref?: Ref<HTMLDivElement>;
}

interface WmeDialogProps extends DialogProps {
  children?: ReactNode;
  bgStyles?: {};
  SidebarProps?: WizardSidebarProps;
  FooterProps?: WizardFooterProps;
  exit?: ReactElement;
  PaperProps?: WmePaperProps;
}

const StyledDialogGridContainer = styled(Grid, {
  name: 'WmeWizardGrid',
  slot: 'Root',
})(() => ({
  height: '100%',
}));

const SidebarContainer = styled(Grid, {
  name: 'SidebarContainer',
  slot: 'Root',
})(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}));

const WizardContainer = styled(
  Grid,
  {
    name: 'WizardContainer',
    slot: 'Root',
  },
)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}));

const PaperComponent = forwardRef((props: WmePaperProps, ref: Ref<HTMLDivElement>) => (
  <Paper ref={ref} {...props} />
));

const Wizard = forwardRef((props: WmeDialogProps, ref: Ref<HTMLDivElement>) => {
  const {
    children,
    bgStyles,
    SidebarProps,
    FooterProps,
    exit,
    ...rest
  } = props;

  const hasSidebar = SidebarProps !== undefined;

  return (
    <Dialog
      fullScreen
      fullWidth
      {...rest}
      PaperComponent={PaperComponent}
      PaperProps={{ ref }}
    >
      <StyledDialogGridContainer container>
        {hasSidebar && (
          <SidebarContainer item xs={2.5}>
            <WizardSidebar {...SidebarProps} />
          </SidebarContainer>
        )}
        <WizardContainer
          item
          xs={hasSidebar ? 9.5 : 12}
          sx={bgStyles}
        >
          {children}
          {FooterProps && (
            <WizardFooter {...FooterProps} />
          )}
        </WizardContainer>
      </StyledDialogGridContainer>
    </Dialog>
  );
});

export default Wizard;
