import React, { ChangeEvent } from 'react';
import {
  IconButton,
  InputAdornment,
  Chip,
  ChipProps,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import {
  InputTitle,
  TextField,
  FormHelperText,
  ErrorText,
} from '..';

/**
 * Password field is a WME Text Field component with additional props
 */

interface PasswordFieldProps {
  label?: string;
  helperText?: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  chipLabel?:string;
  color?: 'default' | 'error' | 'success' | 'warning';
  error?: boolean;
  errorMessage?: string;
}

const StyledChip = styled(Chip, {
  name: 'WmePasswordChip',
  slot: 'Root',
})<ChipProps>(({ theme }) => ({
  height: 26,
  '&.MuiChip-filledSuccess': {
    backgroundColor: theme.palette.success,
    color: theme.palette.text.white,
  },
  '&.MuiChip-filledWarning': {
    backgroundColor: theme.palette.warning,
    color: theme.palette.text.white,
  },
  '&.MuiChip-filledError': {
    backgroundColor: theme.palette.error,
    color: theme.palette.text.white,
  },
}));

const StyledInputAdornment = styled(InputAdornment, {
  name: 'WmeInputAdornment',
  slot: 'Root',
})(() => ({
  position: 'absolute',
  right: 15,
}));

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  const {
    label,
    helperText,
    type,
    value,
    placeholder,
    onChange,
    onClick,
    onMouseDown,
    chipLabel,
    color,
    error,
    errorMessage,
  } = props;

  return (
    <>
      {
        label
        && <InputTitle>{label}</InputTitle>
      }
      <TextField
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        endAdornment={(
          <StyledInputAdornment position="end">
            {
              value.length > 0
              && (
                <StyledChip
                  label={chipLabel}
                  color={color}
                />
              )
            }
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClick}
              onMouseDown={onMouseDown}
              edge="end"
            >
              {type === 'text' ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </StyledInputAdornment>
        )}
      />
      {
        error
        && (
          <ErrorText>{errorMessage}</ErrorText>
        )
      }
      {
        helperText
        && <FormHelperText>{helperText}</FormHelperText>
      }
    </>
  );
};

export default PasswordField;
