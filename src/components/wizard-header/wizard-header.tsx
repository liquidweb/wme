import * as React from 'react';
import { Box, BoxProps, Button, ButtonProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
// import { SxProps } from '@mui/system';
import { Avatar, AvatarProps } from '@mui/material';

interface WizardHeaderProps extends BoxProps {
  // imgProps?: React.ImgHTMLAttributes<HTMLImageElement> & {
  //   sx?: SxProps<Theme>;
  // };
  sizes?: string;
  src?: string;
  srcSet?: string;
  alt?: string;
  button?: React.ReactElement;
}

const StyledWizardHeader = styled(Box, {
  name: 'WmeWizardHeader',
  slot: 'Root',
})<BoxProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(4),
  marginLeft: theme.spacing(4),
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: '1',
}));

const StyledWizardHeaderImg = styled('img', {
  name: 'WmeWizardHeader',
  slot: 'Img',
  // overridesResolver: (props, styles) => styles.img
})({
  width: '100%',
  height: '100%',
  maxWidth: 218,
  textAlign: 'center',
  // Handle non-square image. The property isn't supported by IE11.
  objectFit: 'cover',
  // Hide alt text.
  color: 'transparent',
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000,
});

const StyledWizardHeaderButton = styled(Button, {
  name: 'WmeWizardHeader',
  slot: 'Button',
})(({ theme }) => ({
  // backgroundColor: 'red',
}));

export default function WizardHeader(props: WizardHeaderProps) {
  const { alt, src, srcSet, sizes, button, ...rest } = props;
  return (
    <StyledWizardHeader {...rest}>
      <StyledWizardHeaderImg
        alt={alt}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
      />
      { button }
    </StyledWizardHeader>
  );
}
