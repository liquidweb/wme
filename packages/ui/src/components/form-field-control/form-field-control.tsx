import type React from 'react';
import { FormControlUnstyled, FormControlUnstyledProps } from '@mui/base';
import styled from '@mui/material/styles/styled';

const StyledFormFieldControl = styled(FormControlUnstyled, {
  name: 'WmeFormFieldControl',
  slot: 'Root',
})({});

const FormFieldControl: React.FC<FormControlUnstyledProps> = ({
  children,
  ...props
}) => (
  <StyledFormFieldControl className="WmeFormFieldControl-root" {...props}>
    {children}
  </StyledFormFieldControl>
);

export default FormFieldControl;
