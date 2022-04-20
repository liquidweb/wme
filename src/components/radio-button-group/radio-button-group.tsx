import React from 'react';
import { styled } from '@mui/material/styles';
import {
  RadioGroup,
  RadioGroupProps,
  FormControl,
} from '@mui/material';

export interface RadioButtonGroupProps extends RadioGroupProps {
  ariaLabelledby?:string,
}

const StyledRadioGroup = styled(RadioGroup, {
  name: 'WmeFormGroup',
  slot: 'Root',
})(({ theme }) => ({
  '& .MuiFormControlLabel-root': {
    '& .MuiRadio-root': {
      '&:focus, &:hover': {
        color: theme.palette.primary.dark,
        backgroundColor: 'transparent',
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
