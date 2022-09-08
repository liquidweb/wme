import type React from 'react';
import {
  Box,
  BoxProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface LogoContainerProps extends BoxProps {
  logoSrc?: string | React.ReactNode;
  logoAlt?: string;
  width?: string;
}

const LogoContainer = styled(Box, {
  name: 'WmeLogoContainer',
  slot: 'Root',
})(() => ({
  margin: 0,
  '& img': {
    width: '100%',
  },
  '& svg': {
    width: '100%',
    height: 'auto',
  },
}));

const Logo: React.FC<LogoContainerProps> = (props) => {
  const { logoSrc, logoAlt, width } = props;

  return (
    <LogoContainer className="WmeLogoContainer-root" width={width}>
      { typeof logoSrc === 'object' && logoSrc }
      { typeof logoSrc === 'string' && <img src={logoSrc} alt={logoAlt} /> }
    </LogoContainer>
  );
};

export default Logo;
