import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Styles for Popper are handled in theme.ts.
*/

const StyledTooltip = styled(MuiTooltip, {
  name: 'WmeTooltip',
  slot: 'Root',
})(() => ({
  padding: '2px 4px',
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
