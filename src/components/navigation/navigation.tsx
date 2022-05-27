import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface NavigationProps {
  width?: string;
  children: string | ReactNode;
}

const StyledNavigation = styled(Box)<NavigationProps>(({ width = 'auto' }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width,
}));

export const Navigation: React.FC<NavigationProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <div role="presentation">
      <StyledNavigation className={StyledNavigation.displayName} {...rest}>
        {children}
      </StyledNavigation>
    </div>
  );
};
