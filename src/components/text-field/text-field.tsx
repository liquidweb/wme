import React from 'react';
import {
  InputBase,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InputTitle from '../input-title';

/**
 * MUI's Text Field component is a wrapper for inputs.
 * WmeTextField breaks down the different parts to recreate the wrapper.
 * Label should come from InputTitle.
 */

interface WmeTextFieldProps {
  disabled?: boolean,
  error?: boolean,
  placeholder?: string,
  defaultValue?: string,
  label?: string,
  startAdornment?: any,
  helperText?: string,
}

const WmeInputBase = styled(InputBase, {
  shouldForwardProp: (props) => props !== 'helperText',
  name: 'WmeInputBase',
  slot: 'Root',
})(({ theme }) => ({
  '&.MuiInputBase-root': {
    '& .MuiInputAdornment-root': {
      marginLeft: '-35px',
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
    <FormControl variant="standard" {...rest}>
      <InputTitle>
        {label}
      </InputTitle>
      <WmeInputBase {...props} />
      {
        helperText
        && (
          <FormHelperText sx={{ fontSize: 10 }}>
            {helperText}
          </FormHelperText>
        )
      }
      <FormHelperText />
    </FormControl>
  );
};

export default TextField;
