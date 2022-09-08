import type React from 'react';
import type { PropsWithChildren } from 'react';
import { FormHelperText, FormHelperTextProps, styled } from '@mui/material';

interface InputHelperTextProps extends FormHelperTextProps {
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}

const StyledInputHelperText = styled(FormHelperText, {
  name: 'WmeInputHelperText',
  slot: 'Root',
})({
  fontSize: 10,
  marginLeft: 0,
});

const InputHelperText: React.FC<PropsWithChildren<InputHelperTextProps>> = ({
  children,
  ...props
}) => (
  <StyledInputHelperText
    className="WmeInputHelperText-root"
    {...props}
  >
    {children}
  </StyledInputHelperText>
);

export default InputHelperText;
