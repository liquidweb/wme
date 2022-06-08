import React, { PropsWithChildren, ReactNode } from 'react';
import { FormControlUnstyledProps } from '@mui/base';
import {
  InputError,
  FormFieldControl,
  InputHelperText,
  FormFieldLabel,
} from '..';

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
}) => (
  <FormFieldControl {...props}>
    {label && <FormFieldLabel>{label}</FormFieldLabel>}
    {field}
    {errorMessage && <InputError>{errorMessage}</InputError>}
    {helperText && <InputHelperText>{helperText}</InputHelperText>}
    {children}
  </FormFieldControl>
);

export default FormField;
