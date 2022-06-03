import React from "react";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";

const FileInput: React.FC<InputBaseProps> = (props) => {
  return (
    <InputBase
      type="file"
      {...props}
    />
  );
};

export default FileInput;
