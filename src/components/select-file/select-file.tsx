import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, FileInput, InputHelperText } from "..";

export interface SelectFileProps {
  buttonText?: string;
  helperText?: string;
}

const SelectFile: React.FC<SelectFileProps> = ({ buttonText, helperText }) => {
  return (
    <>
      <FileInput />
      <Button color="primary" startIcon={<AddIcon />} variant="contained">
        {buttonText || 'Add File'}
      </Button>
      {helperText && <InputHelperText>{helperText}</InputHelperText>}
    </>
  );
};

export default SelectFile;
