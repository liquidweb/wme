import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { MenuItem as MuiMenuItem } from '@mui/material';

interface WmeMenuItemProps {
  value: string,
  key: number | string,
  icon?: ReactNode,
  id?: string,
}

const StyledMenuItem = styled(MuiMenuItem, {
  name: 'WmeMenuItem',
  slot: 'Root',
})(({ theme }) => ({
  '& .WmeMenuItem-icon': {
    marginLeft: 'auto',
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.background.hover,
    '&:hover': {
      backgroundColor: theme.palette.background.hover,
    },
  },
}));

const MenuItem: React.FC<WmeMenuItemProps> = (props) => {
  const { children, icon } = props;
  return (
    <StyledMenuItem {...props}>
      {children}
      {icon
      && (
        <span className="WmeMenuItem-icon">
          {icon}
        </span>
      )}
    </StyledMenuItem>
  );
};

export default MenuItem;