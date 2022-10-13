import type React from 'react';
import {
  alpha,
  styled,
  Box,
  ToggleButton,
  ToggleButtonProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface CardSelectItemProps extends ToggleButtonProps {
  primary?: any;
  secondary?: any;
  footer?: any;
  hasFooter?: boolean;
  icon?: any;
  cardPadding?: 'sm' | 'md';
  defaultIcon?: React.ReactNode;
  completedIcon?: React.ReactNode;
}

const StyleCardSelectItem = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'hasFooter' && prop !== 'completedIcon' && prop !== 'cardPadding',
})<CardSelectItemProps>(({ theme, disabled, hasFooter }) => ({
  position: 'relative',
  transition: theme?.transitions?.create(['border-color'], {
    duration: theme.transitions.duration.standard,
  }),
  '&.MuiButtonBase-root.Mui-selected': {
    backgroundColor: 'transparent',
    borderColor: theme.palette.primary.light,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  '&.MuiButtonBase-root.WmeCardSelectItem-root': {
    display: 'flex',
    textTransform: 'none',
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.border.ui}`,
    '& + .MuiButtonBase-root.WmeCardSelectItem-root': {
      borderRadius: theme.spacing(0.5),
      border: `1px solid ${theme.palette.border.ui}`,
    },
    '&:hover, &:focus': {
      borderColor: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
    '& + .MuiButtonBase-root.WmeCardSelectItem-root.Mui-selected': {
      backgroundColor: 'transparent',
      borderColor: theme.palette.primary.light,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    ...(hasFooter && {
      paddingBottom: theme.spacing(2),
    }),
  },
  '& .MuiTouchRipple-root': {
    opacity: '0.25',
  },
  ...(disabled && {
    backgroundColor: theme.palette.background.hover,
    '& .WmeCardSelectItem-icon': {
      backgroundColor: theme.palette.common.white,
    },
  }),
}));

const StyleCardSelectCompleteContainer = styled('div', {
  name: 'WmeCardSelectItem',
  slot: 'CompleteContainer',
})(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const StyleCardSelectCompleteIcon = styled('div', {
  name: 'WmeCardSelectItem',
  slot: 'CompleteIcon',
})(({ theme }) => ({
  width: theme.spacing(2.75),
  height: theme.spacing(2.75),
  borderRadius: '50%',
  backgroundColor: alpha(theme.palette.primary.light, 0.2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '1.4em',
  },
}));

const StyleCardSelectIcon = styled('div', {
  name: 'WmeCardSelectItem',
  slot: 'Icon',
  shouldForwardProp: (prop) => prop !== 'icon',
})(({ theme }) => ({
  width: theme.spacing(7),
  height: theme.spacing(7),
  marginBottom: theme.spacing(2),
  borderRadius: '50%',
  backgroundColor: theme.palette.grey[100],
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '& img, & svg': {
    width: theme.spacing(3),
    height: 'auto',
  },
}));

const StyleCardSelectContentOuter = styled(Box, {
  name: 'WmeCardSelectItem',
  slot: 'ContentOuter',
  shouldForwardProp: (prop) => prop !== 'icon',
})(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const StyleCardSelectContentInner = styled(Box, {
  name: 'WmeCardSelectItem',
  slot: 'ContentInner',
  shouldForwardProp: (prop) => prop !== 'icon',
})(() => ({
  flexGrow: 1,
}));

const StyleCardSelectionFooter = styled(Box, {
  name: 'WmeCardSelectItem',
  slot: 'Footer',
  shouldForwardProp: (prop) => prop !== 'icon',
})(({ theme }) => ({
  fontSize: 10,
  textTransform: 'initial',
  color: theme.palette.text.primary,
  lineHeight: 1.6,
  marginTop: theme.spacing(2),
}));

const PrimaryText = styled(Typography, {
  name: 'WmeCardSelectItem',
  slot: 'Primary',
})<TypographyProps>(({ theme }) => ({
  display: 'block',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const SecondaryText = styled(Typography, {
  name: 'WmeCardSelectItem',
  slot: 'Secondary',
})<TypographyProps>(({ theme }) => ({
  display: 'block',
  color: theme.palette.text.primary,
}));

const CardSelectCompleteIcon = () => (
  <StyleCardSelectCompleteIcon>
    <CheckIcon />
  </StyleCardSelectCompleteIcon>
);

export default function CardSelectItem(props: CardSelectItemProps) {
  const {
    className,
    children,
    icon = '',
    defaultIcon,
    completedIcon,
    primary: primaryProp,
    secondary: secondaryProp,
    footer: footerProp,
    ...rest
  } = props;

  const { selected } = props;

  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;
  let footer = footerProp;

  if (primary != null && primary.type !== Typography) {
    primary = <PrimaryText className="WmeCardSelectItem-primary" variant="body1">{primary}</PrimaryText>;
  }

  if (secondary != null && secondary?.type !== Typography) {
    secondary = <SecondaryText className="WmeCardSelectItem-secondary" variant="body2">{secondary}</SecondaryText>;
  }

  if (footer != null && footer?.type !== Typography) {
    footer = <StyleCardSelectionFooter className="WmeCardSelectItem-footer">{footer}</StyleCardSelectionFooter>;
  }

  const hasFooter = footer != null;

  return (
    <StyleCardSelectItem
      className={`${className} WmeCardSelectItem-root`}
      {...rest}
      hasFooter={hasFooter}
    >
      {selected && (
      <StyleCardSelectCompleteContainer className="WmeCardSelectItem-completeContainer">
        { completedIcon || <CardSelectCompleteIcon /> }
      </StyleCardSelectCompleteContainer>
      )}
      {(defaultIcon && !selected) && (
      <StyleCardSelectCompleteContainer className="WmeCardSelectItem-completeContainer">
        { defaultIcon }
      </StyleCardSelectCompleteContainer>
      )}
      {icon && (
        <StyleCardSelectIcon className="WmeCardSelectItem-icon">
          { typeof icon === 'object' && icon }
          { typeof icon === 'string' && <Box component="img" src={icon} alt="" /> }
        </StyleCardSelectIcon>
      )}
      <StyleCardSelectContentOuter className="WmeCardSelectItem-contentOuter">
        <StyleCardSelectContentInner className="WmeCardSelectItem-contentInner">
          {primary}
          {secondary}
        </StyleCardSelectContentInner>
        {footer}
      </StyleCardSelectContentOuter>
    </StyleCardSelectItem>
  );
}
