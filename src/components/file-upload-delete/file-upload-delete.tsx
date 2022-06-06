import React from "react";
import { Box, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, FormHelperText } from "..";

export interface FileUploadDeleteProps {
  buttonText?: string;
  helperText?: string;
  onCancel?: () => void;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledFileUploadDelete = styled(Box, {
  name: "WmeFileUploadDelete",
  slot: "Root",
})({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const FileUploadDelete: React.FC<FileUploadDeleteProps> = ({
  buttonText,
  helperText,
  onCancel,
  onDelete,
  ...props
}) => (
  <StyledFileUploadDelete
    className={StyledFileUploadDelete.displayName}
    {...props}
  >
    <Button
      color="error"
      onClick={onDelete}
      startIcon={<DeleteIcon />}
      variant="contained"
    >
      {buttonText || "Delete"}
    </Button>
    {helperText && (
      <FormHelperText onClick={onCancel} sx={{ cursor: "pointer" }}>
        {helperText}
      </FormHelperText>
    )}
  </StyledFileUploadDelete>
);

export default FileUploadDelete;
