import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Styles for Popper are handled in theme.ts.
*/

const StyledTooltip = styled(MuiTooltip, {
  name: 'WmeTooltip',
  slot: 'Root',
})(({ theme }) => ({
  padding: '2px 4px',
  transition: 'background 600ms, color 600ms',
  '&:hover': {
    background: theme.palette.primary.main,
    color: theme.palette.text.white,
  },
}));

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <StyledTooltip arrow {...rest}>
      {children}
    </StyledTooltip>
  );
};

export default Tooltip;
