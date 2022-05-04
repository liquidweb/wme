import React, { ReactNode, ChangeEvent } from 'react';
import {
  InputBase,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { InputTitle, FormHelperText, ErrorText } from '..';

/**
 * MUI's Text Field component is a wrapper for inputs.
 * WmeTextField breaks down the different parts to recreate the wrapper.
 * Label should come from InputTitle.
 */

export interface WmeTextFieldProps {
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  defaultValue?: string;
  label: string;
  endAdornment?: ReactNode;
  helperText?: string;
  type?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StyledInputBase = styled(InputBase, {
  name: 'WmeInputBase',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'errorMessage',
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
    '& .MuiInputAdornment-root': {
      '& .MuiSvgIcon-root': {
        color: theme.palette.error.main,
      },
    },
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.background.disabled,
  },
}));

const TextField: React.FC<WmeTextFieldProps> = (props) => {
  const {
    label,
    helperText,
    errorMessage,
    error,
    ...rest
  } = props;

  return (
    <FormControl variant="standard">
      <InputTitle>
        {label}
      </InputTitle>
      <StyledInputBase error={error} {...rest} />
      {
        (error && errorMessage)
        && (
          <ErrorText>{errorMessage}</ErrorText>
        )
      }
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
