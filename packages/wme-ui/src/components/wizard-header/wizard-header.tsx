import type React from 'react';
import type { ReactElement } from 'react';
import {
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export interface WizardHeaderProps {
  children: ReactElement;
}

const WizardHeaderContainer = styled(Box, {
  name: 'WmeWizardHeader',
  slot: 'Root',
})(({ theme }) => ({
  display: 'flex',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
}));

const WizardHeader: React.FC<WizardHeaderProps> = (props) => {
  const {
    children,
  } = props;

  return (
    <WizardHeaderContainer className="WmeWizardHeader-root">
      { children }
    </WizardHeaderContainer>
  );
};

export default WizardHeader;
