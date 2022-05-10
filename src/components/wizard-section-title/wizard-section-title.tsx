import React, { ReactElement } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface WizardSectionTitleProps {
  heading?: string;
  headingVariant?: 'h1' | 'h2' | 'h3' | 'h4';
  copy?: string;
  copyAlign?: 'center' | 'left';
  iconSrc?: string;
  iconAlt?: string;
  width?: string;
  bookend?: boolean;
}

const WizardSectionTitleContainer = styled(Box, {
  name: 'WmeWizardSectionTitle',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'bookend',
})<WizardSectionTitleProps>(({ width, bookend }) => ({
  width: width || 'auto',
  textAlign: bookend ? 'center' : 'inherit',
}));

const Heading = styled(Typography, {
  name: 'WmeWizardSectionTitle',
  slot: 'Heading',
})(() => ({
  marginBottom: '16px',
}));

const IconContainer = styled(Box, {
  name: 'WmeWizardSectionTitle',
  slot: 'IconContainer',
})(() => ({
  marginBottom: '24px',
}));

const WizardSectionTitle: React.FC<WizardSectionTitleProps> = (props) => {
  const {
    heading,
    headingVariant,
    copy,
    copyAlign,
    iconSrc,
    iconAlt,
    width,
    bookend,
  } = props;

  return (
    <WizardSectionTitleContainer width={width} bookend={bookend}>
      {
        iconSrc
        && <IconContainer><img src={iconSrc} alt={iconAlt} /></IconContainer>
      }
      <Heading variant={headingVariant || 'h2'}>{heading}</Heading>
      <Typography variant="body1" align={copyAlign && !bookend ? copyAlign : 'inherit'}>{copy}</Typography>
    </WizardSectionTitleContainer>
  );
};

export default WizardSectionTitle;
