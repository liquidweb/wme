import React from "react";
import { FormControlUnstyled, FormControlUnstyledProps } from "@mui/base";
import styled from "@mui/material/styles/styled";

const StyledFormControl = styled(FormControlUnstyled, {
  name: "WmeFormControl",
  slot: "Root",
})({});

const FormControl: React.FC<FormControlUnstyledProps> = ({
  children,
  ...props
}) => (
  <StyledFormControl className={StyledFormControl.displayName} {...props}>
    {children}
  </StyledFormControl>
);

export default FormControl;
