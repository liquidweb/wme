import React, { PropsWithChildren, ReactNode } from "react";
import { FormControlUnstyledProps } from "@mui/base";

import InputError from "../input-error";
import FormControl from "../form-control";
import InputHelperText from "../input-helper-text";
import InputLabel from "../input-label";

type FormFieldProps = FormControlUnstyledProps & {
  errorMessage?: string;
  field?: ReactNode;
  helperText?: string;
  id?: string;
  label?: string;
};

const FormField: React.FC<PropsWithChildren<FormFieldProps>> = ({
  children,
  errorMessage,
  field,
  helperText,
  id,
  label,
  ...props
}) => {
  return (
    <FormControl {...props}>
      {label && <InputLabel htmlFor={id || ""}>{label}</InputLabel>}
      {field}
      {errorMessage && <InputError>{errorMessage}</InputError>}
      {helperText && <InputHelperText>{helperText}</InputHelperText>}
      {children}
    </FormControl>
  );
};

export default FormField;
