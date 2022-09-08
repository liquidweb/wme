import React from 'react';
import {
  Box,
  BoxProps,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { pxToRem } from '../../utils';

interface WizardSectionTitleProps extends BoxProps {
  heading?: string;
  headingComponent?: React.ElementType;
  headingVariant?: 'h1' | 'h2' | 'h3' | 'h4';
  copy?: string;
  copyAlign?: 'center' | 'left';
  copyVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2';
  iconSrc?: string;
  iconAlt?: string;
  iconWidth?: string;
  width?: string;
  bookend?: boolean;
}

type StyledTypography = {
  component?: React.ElementType;
};

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
})<StyledTypography>(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const Copy = styled(Typography, {
  name: 'WmeWizardSectionTitle',
  slot: 'Copy',
})<StyledTypography>(() => ({
  lineHeight: pxToRem(24),
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
    headingComponent,
    headingVariant,
    copy,
    copyAlign,
    copyVariant,
    iconSrc,
    iconAlt,
    iconWidth = 'auto',
    width,
    bookend,
    ...rest
  } = props;

  return (
    <WizardSectionTitleContainer
      className="WmeWizardSectionTitle-root"
      width={width}
      bookend={bookend}
      {...rest}
    >
      {iconSrc && (
        <IconContainer className="WmeWizardSectionTitle-iconContainer">
          <img src={iconSrc} alt={iconAlt} width={iconWidth} />
        </IconContainer>
      )}
      {heading && (
        <Heading
          className="WmeWizardSectionTitle-heading"
          component={headingComponent || 'h2'}
          variant={headingVariant}
        >
          {heading}
        </Heading>
      )}
      {copy && (
        <Copy
          align={copyAlign && !bookend ? copyAlign : 'inherit'}
          className="WmeWizardSectionTitle-copy"
          variant={copyVariant || 'body1'}
        >
          {copy}
        </Copy>
      )}
    </WizardSectionTitleContainer>
  );
};

export default WizardSectionTitle;
