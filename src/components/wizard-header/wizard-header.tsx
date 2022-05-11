import React, { ReactElement } from 'react';
import {
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WizardHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  exit?: ReactElement;
}

const WizardHeaderContainer = styled(Box, {
  name: 'WmeWizardHeader',
  slot: 'Root',
})(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
}));

const LogoContainer = styled(Box, {
  name: 'WmeWizardHeader',
  slot: 'LogoContainer',
})(() => ({
  margin: 0,
}));

const ExitContainer = styled(Box, {
  name: 'WmeWizardHeader',
  slot: 'ExitContainer',
})(() => ({
  margin: 0,
}));

const WizardHeader: React.FC<WizardHeaderProps> = (props) => {
  const {
    logoSrc,
    logoAlt,
    exit,
  } = props;

  return (
    <WizardHeaderContainer>
      <LogoContainer>
        {
          logoSrc
          && <img src={logoSrc} alt={logoAlt} />
        }
      </LogoContainer>
      <ExitContainer>
        {exit}
      </ExitContainer>
    </WizardHeaderContainer>
  );
};

export default WizardHeader;
