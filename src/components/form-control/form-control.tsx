import React from "react";
import { FormControlUnstyled, FormControlUnstyledProps } from "@mui/base";

const FormControl: React.FC<FormControlUnstyledProps> = ({
  children,
  ...props
}) => {
  return <FormControlUnstyled {...props}>{children}</FormControlUnstyled>;
};

export default FormControl;
