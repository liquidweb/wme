import React from 'react';
import { styled } from '@mui/material/styles';
import {
  RadioGroup,
  RadioGroupProps,
  FormControl,
} from '@mui/material';
import { ErrorText } from '..';

export interface RadioButtonGroupProps extends RadioGroupProps {
  ariaLabelledby?: string;
  error?: boolean;
  errorMessage?: string;
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
  const {
    children,
    ariaLabelledby,
    error,
    errorMessage,
    ...rest
  } = props;

  return (
    <FormControl>
      <StyledRadioGroup
        className={StyledRadioGroup.displayName}
        aria-labelledby={ariaLabelledby}
        {...rest}
      >
        {children}
      </StyledRadioGroup>
      <RadioGroup />
      {
        (error && errorMessage)
        && (
          <ErrorText sx={{ marginTop: 0 }}>{errorMessage}</ErrorText>
        )
      }
    </FormControl>
  );
};

export default RadioButtonGroup;
