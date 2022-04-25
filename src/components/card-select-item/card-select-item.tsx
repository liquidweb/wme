import * as React from 'react';
import {
  alpha,
  styled,
  Box,
  ToggleButton,
  ToggleButtonProps,
  Typography
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface CardSelectItemProps extends ToggleButtonProps {
  primary?: any;
  secondary?: any;
  icon?: string;
}

const StyleCardSelectItem = styled(ToggleButton, {
})(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  transition: theme?.transitions?.create(['border-color'], {
    duration: theme.transitions.duration.standard,
  }),
  '&.MuiButtonBase-root.Mui-selected': {
    borderColor: theme.palette.primary.light,
    backgroundColor: 'transparent',
  },
  '&.MuiButtonBase-root': {
    '&:hover, &:focus': {
      borderColor: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
  '& .MuiTouchRipple-root': {
    opacity: '0.25',
  },
}));

const StyleCardSelectCompleteIcon = styled('div', {
  name: 'WmeCardSelectItem',
  slot: 'Complete-Icon',
})(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
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
  marginBottom: theme.spacing(1),
  borderRadius: '50%',
  backgroundColor: theme.palette.grey[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  '& img': {
    width: theme.spacing(3),
    height: 'auto',
  }
}));

const StyleCardSelectContent = styled(Box, {
  name: 'WmeCardSelectItem',
  slot: 'Content',
  shouldForwardProp: (prop) => prop !== 'icon',
})(() => ({}));

export default function CardSelectItem(props: CardSelectItemProps) {
  const {
    className,
    children,
    icon,
    primary: primaryProp,
    secondary: secondaryProp,
    ...rest
  } = props;

  const { selected } = props;

  let primary = primaryProp !== null ? primaryProp : children;
  let secondary = secondaryProp;

  if (primary !== null && primary.type !== Typography) {
    primary = <Typography variant="body">{primary}</Typography>;
  }

  if (secondary !== null && secondary.type !== Typography) {
    secondary = <Typography variant="caption">{secondary}</Typography>;
  }

  return (
    <StyleCardSelectItem className={`${className} WmeCardSelectItem-root`} {...rest}>
      {selected && (
      <StyleCardSelectCompleteIcon>
        <CheckIcon />
      </StyleCardSelectCompleteIcon>
      )}
      {icon && (
        <StyleCardSelectIcon className="WmeCardSelectItem-icon">
          <img src={icon} alt="" />
        </StyleCardSelectIcon>
      )}
      <StyleCardSelectContent className="WmeCardSelectItem-content">
        {primary}
        {secondary}
      </StyleCardSelectContent>
    </StyleCardSelectItem>
  );
}
