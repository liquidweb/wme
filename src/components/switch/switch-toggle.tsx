import React from 'react';
import { Switch as MuiSwitch, SwitchProps, styled } from '@mui/material';

const StyledSwitch = styled(MuiSwitch, {
  name: 'WmeSwitch',
  slot: 'Root',
})(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiSwitch-thumb': {
      border: `1px solid ${theme.palette.text.disabled}`,
    },
    '+ .MuiSwitch-track': {
      backgroundColor: theme.palette.text.disabled,
      opacity: 1,
    },
    '&.Mui-checked': {
      '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.background.primary,
        border: `1px solid ${theme.palette.primary.main}`,
      },
      '+ .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
    },
  },
}));

const Switch: React.FC<SwitchProps> = (props) => (
  <StyledSwitch {...props} />
);

export default Switch;
