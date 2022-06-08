import React, { PropsWithChildren } from 'react';
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
    className={StyledInputHelperText.displayName}
    {...props}
  >
    {children}
  </StyledInputHelperText>
);

export default InputHelperText;
