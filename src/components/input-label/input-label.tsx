import React, { PropsWithChildren } from "react";
import {
  styled,
  InputLabel as MuiInputLabel,
  InputLabelProps as MuiInputLabelProps,
} from "@mui/material";

const StyledInputLabel = styled(MuiInputLabel, {
  name: "WmeInputLabel",
  slot: "Root",
})(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: "600",
  marginBottom: 5,
  textAlign: "left",
}));

const InputLabel: React.FC<PropsWithChildren<MuiInputLabelProps>> = ({
  children,
  ...props
}) => {
  return (
    <StyledInputLabel className={StyledInputLabel.displayName} {...props}>
      {children}
    </StyledInputLabel>
  );
};

export default InputLabel;
