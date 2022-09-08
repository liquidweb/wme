import type React from 'react';
import { useFormControlUnstyledContext } from '@mui/base';
import { InputBase, InputBaseProps, styled } from '@mui/material';

const StyledTextInput = styled(InputBase, {
  name: 'WmeTextInput',
  slot: 'Root',
})(({ theme }) => ({
  '&.MuiInputBase-root': {
    '& .MuiInputAdornment-root': {
      position: 'absolute',
      right: 15,
    },
  },
  '& .MuiInputBase-input': {
    border: `1px solid ${theme.palette.border.ui}`,
    borderRadius: 4,
    padding: '4px 12px',
    position: 'relative',
    width: '100%',
    '&:focus': {
      borderColor: theme.palette.text.primary,
      boxShadow: 'none',
      outline: 'none',
    },
    '&:disabled': {
      borderColor: theme.palette.background.disabled,
      backgroundColor: theme.palette.background.disabled,
      boxShadow: 'none',
    },
  },
  '&.MuiInputBase-adornedEnd .MuiInputBase-input': {
    paddingRight: '35px',
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
    borderRadius: 4,
    backgroundColor: theme.palette.background.disabled,
  },
}));

const TextInput: React.FC<InputBaseProps> = (props) => {
  const formControlContext = useFormControlUnstyledContext();
  return (
    <StyledTextInput
      className="WmeTextInput-root"
      error={formControlContext?.error}
      {...props}
    />
  );
};

export default TextInput;
