import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, InputHelperText } from "..";

export interface DeleteFileProps {
  buttonText?: string;
  helperText?: string;
  onCancel?: () => void;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteFile: React.FC<DeleteFileProps> = ({
  buttonText,
  helperText,
  onCancel,
  onDelete,
}) => {
  return (
    <>
      <Button
        color="error"
        onClick={onDelete}
        startIcon={<DeleteIcon />}
        variant="contained"
      >
        {buttonText || "Delete"}
      </Button>
      {helperText && (
        <InputHelperText onClick={onCancel} sx={{ cursor: "pointer" }}>
          {helperText}
        </InputHelperText>
      )}
    </>
  );
};

export default DeleteFile;
