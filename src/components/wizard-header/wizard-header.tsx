import React, { ReactElement } from 'react';
import {
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WizardHeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  centerContent?: ReactElement;
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
  zIndex: 1,
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
    centerContent,
    exit,
  } = props;

  return (
    <WizardHeaderContainer className={WizardHeaderContainer.displayName}>
      <LogoContainer className={LogoContainer.displayName}>
        {
          logoSrc
          && <img src={logoSrc} alt={logoAlt} />
        }
      </LogoContainer>
      {centerContent}
      <ExitContainer className={ExitContainer.displayName}>
        {exit}
      </ExitContainer>
    </WizardHeaderContainer>
  );
};

export default WizardHeader;
