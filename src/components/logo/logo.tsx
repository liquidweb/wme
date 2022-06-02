import React from 'react';
import {
  Box,
  BoxProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface LogoContainerProps extends BoxProps {
  logoSrc?: string;
  logoAlt?: string;
  width?: string;
}

const LogoContainer = styled(Box, {
  name: 'WmeWizardHeader',
  slot: 'LogoContainer',
})(() => ({
  margin: 0,
  '& img': {
    width: '100%',
  },
}));

const Logo: React.FC<LogoContainerProps> = (props) => {
  const { logoSrc, logoAlt, width } = props;

  return (
    <LogoContainer className={LogoContainer.displayName} width={width}>
      <img src={logoSrc} alt={logoAlt} />
    </LogoContainer>
  );
};

export default Logo;
