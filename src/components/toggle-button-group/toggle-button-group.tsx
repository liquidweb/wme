import React from 'react';
import { ToggleButtonGroup as MuiToggleButtonGroup, ToggleButtonGroupProps as MuiToggleButtonGroupProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ToggleButtonGroupProps extends MuiToggleButtonGroupProps {
  variant?: 'outlined';
  numbuttons: number;
}

// eslint-disable-next-line max-len
const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)<ToggleButtonGroupProps>(({ theme }) => ({
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

// eslint-disable-next-line max-len
const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = (props) => <StyledToggleButtonGroup {...props} />;

export default ToggleButtonGroup;
