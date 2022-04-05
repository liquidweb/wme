import React from 'react';
import {
  InputBase,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * MUI's Text Field component is a wrapper for inputs
 * WmeTextField breaks down the different parts to recreate the wrapper
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

const WmeInputLabel = styled(InputLabel, {
  name: 'WmeInputLabel',
  slot: 'Root',
})(({ theme }) => ({
  ' &.MuiInputLabel-root': {
    fontSize: 20,
    '&.Mui-focused': {
      color: theme.palette.text.primary,
    },
  },
}));

const WmeInputBase = styled(InputBase, {
  name: 'WmeInputBase',
  slot: 'Root',
})(({ theme }) => ({
  '&.MuiInputBase-root': {
    '& .MuiInputAdornment-root': {
      marginLeft: '-35px',
    },
  },
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: `1px solid ${theme.palette.border.ui}`,
    width: '415px',
    padding: '5px 6px',
    paddingRight: '35px',
    '&:focus': {
      borderColor: theme.palette.border.dark,
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
  const { label, helperText } = props;

  return (
    <FormControl variant="standard" {...props}>
      <WmeInputLabel shrink htmlFor="wme-input">
        {label}
      </WmeInputLabel>
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
