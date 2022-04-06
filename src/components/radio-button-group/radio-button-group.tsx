import React from 'react';
import { styled } from '@mui/material/styles';
import {
  RadioGroup,
  FormControl,
} from '@mui/material';

interface RadioButtonGroupProps {
  name: string,
  ariaLabelledby?:string,
  onChange: any,
  value: string,
}

const StyledRadioGroup = styled(RadioGroup, {
  name: 'WmeFormGroup',
  slot: 'Root',
})(({ theme }) => ({
  '& .MuiFormControlLabel-root': {
    '& .MuiRadio-root': {
      '&:focus': {
        color: theme.palette.primary.dark,
      },
    },
  },
}));

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = (props) => {
  const { children, ariaLabelledby, ...rest } = props;

  return (
    <FormControl>
      <StyledRadioGroup aria-labelledby={ariaLabelledby} {...rest}>
        {children}
      </StyledRadioGroup>
      <RadioGroup />
    </FormControl>
  );
};

export default RadioButtonGroup;
