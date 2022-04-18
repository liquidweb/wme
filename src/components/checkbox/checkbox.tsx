import React from 'react';
import { styled } from '@mui/material/styles';
import { Checkbox as MuiCheckbox, FormGroup } from '@mui/material';
import FormControlLabel from '../form-control-label';

interface CheckboxProps {
  label: string,
}

const StyledCheckbox = styled(MuiCheckbox, {
  name: 'WmeCheckbox',
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

const Checkbox: React.FC<CheckboxProps> = (props) => (
  <FormGroup>
    <FormControlLabel control={<StyledCheckbox />} {...props} />
  </FormGroup>
);

export default Checkbox;
