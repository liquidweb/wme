import React from 'react';
import { styled } from '@mui/material/styles';
import { Checkbox as MuiCheckbox, FormGroup } from '@mui/material';
import FormControlLabel from '../form-control-label';

interface CheckboxProps {
  label: string,
}

const WmeCheckbox = styled(MuiCheckbox, {
  name: 'WmeCheckbox',
  slot: 'Root',
})(({ theme }) => ({
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
    },
  },
  '&:focus': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
    },
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.text.disabled,
  },
}));

const Checkbox: React.FC<CheckboxProps> = (props) => (
  <FormGroup>
    <FormControlLabel control={<WmeCheckbox />} {...props} />
  </FormGroup>
);

export default Checkbox;
