import React from 'react';
import { styled } from '@mui/material/styles';
import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup } from '@mui/material';

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

const WmeFormControlLabel = styled(FormControlLabel, {
  name: 'WmeFormControlLabel',
  slot: 'Root',
})(() => ({
  '& .MuiTypography-root': {
    fontSize: 14,
  },
}));

const Checkbox: React.FC<CheckboxProps> = (props) => (
  <FormGroup>
    <WmeFormControlLabel control={<WmeCheckbox />} {...props} />
  </FormGroup>
);

export default Checkbox;
