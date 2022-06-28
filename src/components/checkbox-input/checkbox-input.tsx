import React from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps, styled } from '@mui/material';

const StyledCheckbox = styled(MuiCheckbox, {
  name: 'WmeCheckboxInput',
  slot: 'Root',
})(({ theme }) => ({
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
    },
  },
  '&:focus, &:hover': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.dark,
    },
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.text.disabled,
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const CheckboxInput: React.FC<CheckboxProps> = (props) => (
  <StyledCheckbox className="WmeCheckboxInput-root" {...props} />
);

export default CheckboxInput;
