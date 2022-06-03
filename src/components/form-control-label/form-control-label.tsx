import React from "react";
import {
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps,
  styled,
} from "@mui/material";

const StyledFormControlLabel = styled(MuiFormControlLabel, {
  name: "WmeFormControlLabel",
  slot: "Root",
})(() => ({
  "& .MuiTypography-root": {
    fontSize: 14,
    textAlign: "left",
  },
}));

const FormControlLabel: React.FC<FormControlLabelProps> = (props) => {
  return (
    <StyledFormControlLabel
      className={StyledFormControlLabel.displayName}
      {...props}
    />
  );
};

export default FormControlLabel;
