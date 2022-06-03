import React from "react";
import { useFormControlUnstyledContext } from "@mui/base";
import { styled, Typography, TypographyProps } from "@mui/material";

const StyledInputError = styled(Typography, {
  name: "WmeInputError",
  slot: "Root",
})(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 10,
  marginTop: 8,
}));

const InputError: React.FC<TypographyProps> = ({ children, ...props }) => {
  const formControlContext = useFormControlUnstyledContext();

  if (formControlContext?.error) {
    return <StyledInputError {...props}>{children}</StyledInputError>;
  }

  return null;
};

export default InputError;
