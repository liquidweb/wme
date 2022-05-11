import React, { ReactElement } from 'react';
import {
  Box,
  BoxProps,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WizardSectionTitleProps extends BoxProps {
  heading?: string;
  headingVariant?: 'h1' | 'h2' | 'h3' | 'h4';
  copy?: string;
  copyAlign?: 'center' | 'left';
  iconSrc?: string;
  iconAlt?: string;
  iconWidth?: string;
  width?: string;
  bookend?: boolean;
}

const WizardSectionTitleContainer = styled(Box, {
  name: 'WmeWizardSectionTitle',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'bookend',
})<WizardSectionTitleProps>(({ width, bookend }) => ({
  width: width || 'auto',
  margin: bookend ? '0px auto' : 0,
  textAlign: bookend ? 'center' : 'inherit',
}));

const Heading = styled(Typography, {
  name: 'WmeWizardSectionTitle',
  slot: 'Heading',
})(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const IconContainer = styled(Box, {
  name: 'WmeWizardSectionTitle',
  slot: 'IconContainer',
})(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const WizardSectionTitle: React.FC<WizardSectionTitleProps> = (props) => {
  const {
    heading,
    headingVariant,
    copy,
    copyAlign,
    iconSrc,
    iconAlt,
    iconWidth = 'auto',
    width,
    bookend,
    ...rest
  } = props;

  return (
    <WizardSectionTitleContainer width={width} bookend={bookend} {...rest}>
      {
        iconSrc
        && <IconContainer><img src={iconSrc} alt={iconAlt} width={iconWidth} /></IconContainer>
      }
      <Heading variant={headingVariant || 'h2'}>{heading}</Heading>
      <Typography variant="body1" align={copyAlign && !bookend ? copyAlign : 'inherit'}>{copy}</Typography>
    </WizardSectionTitleContainer>
  );
};

export default WizardSectionTitle;
