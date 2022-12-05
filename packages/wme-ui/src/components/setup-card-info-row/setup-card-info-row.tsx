import type React from 'react';
import {
  Box,
  BoxProps,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material';

interface SetupCardInfoRowProps extends BoxProps {
  icon?: string;
  hasIcon?: boolean;
  primary?: any;
  secondary?: any;
}

const PrimaryText = styled(Typography, {
  name: 'WmeCardInfoRow',
  slot: 'Primary',
})<TypographyProps>(() => ({}));

const SecondaryText = styled(Typography, {
  name: 'WmeCardInfoRow',
  slot: 'Secondary',
})<TypographyProps>(() => ({
  marginLeft: 'auto',
}));

const StyledSetupCardInfoRow = styled(Box, {
  name: 'WmeSetupCardInfoRow',
  slot: 'root',
  shouldForwardProp: (prop) => prop !== 'hasIcon',
})<SetupCardInfoRowProps>(({ theme, hasIcon }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  ...(hasIcon && {
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
      fontSize: '1rem',
    },
  }),
}));

const SetupCardInfoRow: React.FC<SetupCardInfoRowProps> = (props) => {
  const {
    className,
    children,
    icon,
    primary: primaryProp,
    secondary: secondaryProp,
    ...rest
  } = props;

  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;

  if (primary != null && primary.type !== Typography) {
    primary = <PrimaryText variant="body2">{primary}</PrimaryText>;
  }

  if (secondary != null && secondary?.type !== Typography) {
    secondary = <SecondaryText variant="body2">{secondary}</SecondaryText>;
  }

  return (
    <StyledSetupCardInfoRow
      className="WmeSetupCardInfoRow-root"
      hasIcon={!!icon}
      {...rest}
      component="div"
    >
      {icon}
      {primary}
      {secondary}
    </StyledSetupCardInfoRow>
  );
};

export default SetupCardInfoRow;
