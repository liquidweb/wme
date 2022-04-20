import React from 'react';
import { styled } from '@mui/material/styles';
import { Checkbox as MuiCheckbox, FormGroup } from '@mui/material';
import { FormControlLabel, InputTitle, ErrorText } from '..';

interface CheckboxProps {
  inputLabel?: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
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

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const {
    inputLabel,
    error,
    errorMessage,
    ...rest
  } = props;

  return (
    <FormGroup>
      {
        inputLabel
        && <InputTitle>{inputLabel}</InputTitle>
      }
      <FormControlLabel control={<StyledCheckbox />} {...rest} />
      {
        error
        && <ErrorText sx={{ marginTop: 0 }}>{errorMessage}</ErrorText>
      }
    </FormGroup>
  );
};

export default Checkbox;
