import React, { useState } from 'react';
import {
  IconButton,
  InputAdornment,
  Chip,
  ChipProps,
  InputBaseProps
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import {
  TextField,
  FormHelperText,
  ErrorText,
} from '..';

/**
 * Password field is a WME Text Field component with additional props
 */

interface PasswordFieldProps extends InputBaseProps {
  errorMessage?: string;
  helperText?: string;
  chipLabel?: string;
  onClick?: () => void;
  value: any;
}

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};

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
    helperText,
    value,
    onClick,
    chipLabel,
    color,
    errorMessage,
    type,
    error,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <TextField
        value={value}
        type={showPassword ? 'text' : 'password'}
        error={error}
        endAdornment={(
          <StyledInputAdornment className={StyledInputAdornment.displayName} position="end">
            {
              value?.length > 0
              && (
                <StyledChip
                  label={chipLabel}
                  color={color}
                  className={StyledChip.displayName}
                />
              )
            }
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {type === 'text' ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </StyledInputAdornment>
        )}
        {...rest}
      />
      {
        (error && errorMessage)
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
