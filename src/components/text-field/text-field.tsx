import React, { ReactNode } from 'react';
import {
  InputBase,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InputTitle from '../input-title';
import FormHelperText from '../form-helper-text';

/**
 * MUI's Text Field component is a wrapper for inputs.
 * WmeTextField breaks down the different parts to recreate the wrapper.
 * Label should come from InputTitle.
 */

export interface WmeTextFieldProps {
  disabled?: boolean,
  error?: boolean,
  placeholder?: string,
  defaultValue?: string,
  label?: string,
  endAdornment?: ReactNode,
  helperText?: string,
  type?: string,
  value?: string,
  onChange?: any,
}

const StyledInputBase = styled(InputBase, {
  name: 'WmeInputBase',
  slot: 'Root',
})(({ theme }) => ({
  '&.MuiInputBase-root': {
    '& .MuiInputAdornment-root': {
      position: 'absolute',
      right: 15,
    },
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: `1px solid ${theme.palette.text.disabled}`,
    width: '415px',
    padding: '5px 6px',
    paddingRight: '35px',
    '&:focus': {
      borderColor: theme.palette.text.primary,
    },
  },
  '&.Mui-error': {
    color: theme.palette.error.main,
    '& .MuiInputBase-input': {
      borderColor: theme.palette.error.main,
    },
  },
}));

const TextField: React.FC<WmeTextFieldProps> = (props) => {
  const { label, helperText, ...rest } = props;

  return (
    <FormControl variant="standard">
      <InputTitle>
        {label}
      </InputTitle>
      <StyledInputBase {...rest} />
      {
        helperText
        && (
          <FormHelperText>
            {helperText}
          </FormHelperText>
        )
      }
    </FormControl>
  );
};

export default TextField;
