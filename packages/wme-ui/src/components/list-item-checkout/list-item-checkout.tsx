import type React from 'react';
import {
  Box,
  ListItem as MuiListItem,
  ListItemProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Chip, ChipProps } from '..';

export interface WmeListItemCheckoutProps extends ListItemProps {
  name?: string;
  price?: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  icon?: React.ReactElement;
  iconDisabled?: React.ReactElement;
  iconSelected?: React.ReactElement;
  chipColor?: ChipProps['color'];
  chipLabel?: ChipProps['label'];
}

const StyledListItemCheckout = styled(MuiListItem, {
  name: 'WmeListItemCheckout',
  slot: 'Root',
})(({ theme }) => ({
  margin: 0,
  display: 'flex',
  gap: theme.spacing(2),
  '& .MuiButton-text.WmeButton-root': {
    fontWeight: '600',
    color: theme.palette.text.disabled,
  },
}));

const PrimaryText = styled(Typography, {
  name: 'WmeListItemCheckout',
  slot: 'Primary',
})<TypographyProps & { selected?: boolean }>(({ theme }) => ({
  display: 'block',
  fontWeight: 600,
  color: theme.palette.text.primary,
  flexGrow: 1,
}));

const SecondaryText = styled(Typography, {
  name: 'WmeListItemCheckout',
  slot: 'SecondaryText',
})<TypographyProps>(({ theme }) => ({
  display: 'block',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const StyledListItemCheckoutContentInner = styled(Box, {
  name: 'WmeListItemCheckout',
  slot: 'ContentInner',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

const StyledAddToCartIcon = styled(AddShoppingCartIcon, {
  name: 'WmeListItemCheckout',
  slot: 'AddShoppingCartIcon',
})(({ theme }) => ({
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const StyledCheckCircleIcon = styled(CheckCircleIcon, {
  name: 'WmeListItemCheckout',
  slot: 'CheckCircleIcon',
})(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const ListItemCheckout: React.FC<WmeListItemCheckoutProps> = (props) => {
  const {
    name,
    price,
    chipColor,
    chipLabel,
    disabled,
    selected,
    icon = <StyledAddToCartIcon />,
    iconDisabled = <NotInterestedIcon />,
    iconSelected = <StyledCheckCircleIcon />,
    ...rest
  } = props;

  function getIconToRender() {
    if (disabled) return iconDisabled;
    if (selected) return iconSelected;
    return icon;
  }
  const iconToRender = getIconToRender();
  return (
    <StyledListItemCheckout
      className="WmeListItemCheckout-root"
      secondaryAction={(
        <IconButton edge="end" aria-label="add-to-cart" disabled={disabled}>
          {iconToRender}
        </IconButton>
      )}
      {...rest}
    >
      <PrimaryText selected={selected}>{name}</PrimaryText>
      <StyledListItemCheckoutContentInner className="WmeListItemCheckout-contentInner">
        <SecondaryText>{price}</SecondaryText>
        {chipLabel && <Chip color={chipColor} label={chipLabel} disabled={disabled} />}
      </StyledListItemCheckoutContentInner>
    </StyledListItemCheckout>
  );
};

export default ListItemCheckout;
