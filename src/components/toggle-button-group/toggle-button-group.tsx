import React, { ReactElement, ChangeEvent } from 'react';
import { ToggleButtonGroup as MuiToggleButtonGroup, ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {
  children: Array<ReactElement>;
  onChange: (event: ChangeEvent<unknown>) => void;
  value: string | null;
  ariaLabel?: string;
}

// eslint-disable-next-line max-len
const StyledToggleButtonGroup = styled(MuiToggleButtonGroup, {
  shouldForwardProp: (props) => props !== 'numOfButtons',
  name: 'WmeToggleButtonGroup',
  slot: 'Root',
})<ToggleButtonGroupProps>(({ theme }) => ({
  '.MuiToggleButton-root': {
    border: `1px solid ${theme.palette.text.primary}`,
    color: theme.palette.text.primary,
    textTransform: 'none',
    padding: '6px 12px',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.white,

      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.white,
      },
    },
  },
}));

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = (props) => {
  const { children, ariaLabel, ...rest } = props;

  return (
    <StyledToggleButtonGroup
      exclusive
      aria-label={ariaLabel}
      {...rest}
    >
      { children }
    </StyledToggleButtonGroup>
  );
};

export default ToggleButtonGroup;
