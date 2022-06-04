import React from "react";
import { Box, styled } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import AddIcon from "@mui/icons-material/Add";
import { Button, FileInput, FormHelperText } from "..";

const StyledFileUploadSelect = styled(Box, {
  name: "WmeFileUploadSelect",
  slot: "Root",
})({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "& .MuiInputBase-input": visuallyHidden,
});

export interface FileUploadSelectProps {
  buttonText?: string;
  helperText?: string;
}

const FileUploadSelect: React.FC<FileUploadSelectProps> = ({
  buttonText,
  helperText,
  ...props
}) => (
  <StyledFileUploadSelect
    className={StyledFileUploadSelect.displayName}
    {...props}
  >
    <FileInput />
    <Button color="primary" startIcon={<AddIcon />} variant="contained">
      {buttonText || "Add File"}
    </Button>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </StyledFileUploadSelect>
);

export default FileUploadSelect;
