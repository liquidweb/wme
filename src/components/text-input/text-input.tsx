import React from 'react';
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
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: 4,
    padding: '5px 6px',
    paddingRight: '35px',
    position: 'relative',
    width: '100%',
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

const TextInput: React.FC<InputBaseProps> = (props) => {
  const formControlContext = useFormControlUnstyledContext();
  return (
    <StyledTextInput
      className={StyledTextInput.displayName}
      error={formControlContext?.error}
      {...props}
    />
  );
};

export default TextInput;
