/* eslint-disable no-param-reassign */
import React from "react";
import { Box, BoxProps, styled } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import {
  DeleteFile,
  DeleteFileProps,
  File,
  FileProps,
  SelectFile,
  SelectFileProps,
} from "..";

interface FileUploadProps extends BoxProps {
  actionProps?: any;
  actions?: React.ReactElement;
  deleteFileProps?: DeleteFileProps;
  error?: boolean;
  file?: React.ReactElement;
  fileProps?: FileProps;
  select?: React.ReactElement;
  selectFileProps?: SelectFileProps;
  showActions?: boolean;
}

const StyledFileUpload = styled(Box, {
  name: "WmeFileUpload",
  slot: "Root",
})<FileUploadProps>(({ error, theme }) => ({
  alignItems: "center",
  border: error
    ? `1px dashed ${theme.palette.error.main}`
    : "1px dashed #C4C4C4",
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: 106,
  width: 415,
  "& .MuiInputBase-input": visuallyHidden,
}));

const FileUpload: React.FC<FileUploadProps> = ({
  actionProps,
  actions,
  deleteFileProps,
  error,
  file,
  fileProps,
  select,
  selectFileProps,
  showActions,
  ...props
}) => {
  // Use `DeleteFile` if no override is preset
  if (!actions) {
    actions = <DeleteFile {...deleteFileProps} />;
  }

  // Use `File` if no override is preset
  if (!file) {
    file = <File {...fileProps} />;
  }

  // Use `SelectFile` if no override is preset
  if (!select) {
    select = <SelectFile {...selectFileProps} />;
  }

  // Toggle "actions" display logic
  const preview = showActions ? actions : file;

  return (
    <StyledFileUpload className={StyledFileUpload.displayName} {...props}>
      {error || !fileProps ? select : preview}
    </StyledFileUpload>
  );
};

export default FileUpload;
