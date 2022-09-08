import type React from 'react';
import {
  IconButton,
  InputAdornment,
  InputAdornmentProps,
  styled,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface EndAdornmentProps extends InputAdornmentProps {
  chip?: React.ReactElement;
  onClickAdornment?: React.MouseEventHandler<HTMLButtonElement>;
  visible: boolean;
}

const StyledInputAdornment = styled(InputAdornment, {
  name: 'WmePasswordInputAdornment',
  slot: 'Root',
})({
  position: 'absolute',
  right: 15,
});

const EndAdornment: React.FC<EndAdornmentProps> = ({
  chip,
  onClickAdornment,
  visible,
  ...props
}) => (
  <StyledInputAdornment className="WmePasswordInputAdornment-root" {...props}>
    {chip}
    <IconButton
      aria-label="toggle password visibility"
      edge="end"
      onClick={onClickAdornment}
      onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
    >
      {visible ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  </StyledInputAdornment>
);

export default EndAdornment;
