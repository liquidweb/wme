import React from "react";
import { FormControlLabelProps } from "@mui/material";
import { FormControlLabel, CheckboxInput } from "..";

const Checkbox: React.FC<FormControlLabelProps> = (props) => {
  return <FormControlLabel {...props} control={<CheckboxInput />} />;
};

export default Checkbox;
