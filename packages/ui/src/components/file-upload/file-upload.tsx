/* eslint-disable no-param-reassign */
import React from 'react';
import { useFormControlUnstyledContext } from '@mui/base/FormControlUnstyled';
import { Box, BoxProps, styled } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import {
  FileUploadHeader,
  FileUploadHeaderProps,
  FileUploadPreview,
  FileUploadPreviewProps,
  FileUploadRemove,
  FileUploadRemoveProps,
  FileUploadSelect,
  FileUploadSelectProps,
} from '..';

interface FileUploadProps extends BoxProps {
  action?: React.ReactElement;
  actionProps?: any;
  alert?: React.ReactElement;
  error?: boolean;
  header?: React.ReactElement;
  headerProps?: FileUploadHeaderProps;
  uploaded?: boolean;
  preview?: React.ReactElement;
  previewProps?: FileUploadPreviewProps;
  removeProps?: FileUploadRemoveProps;
  select?: React.ReactElement;
  selectProps?: FileUploadSelectProps;
  showActions?: boolean;
}

const StyledFileUpload = styled(Box, {
  name: 'WmeFileUpload',
  slot: 'Root',
})({});

const StyledFileUploadBody = styled(Box, {
  name: 'WmeFileUploadBody',
  slot: 'Root',
})<FileUploadProps>(({ error, theme }) => ({
  alignItems: 'center',
  border: error
    ? `1px dashed ${theme.palette.error.main}`
    : '1px dashed #C4C4C4',
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: 106,
  '& .MuiInputBase-input': visuallyHidden,
}));

const FileUpload: React.FC<FileUploadProps> = ({
  action,
  actionProps,
  alert,
  error,
  header,
  headerProps,
  uploaded,
  preview,
  previewProps,
  removeProps,
  select,
  selectProps,
  showActions,
  ...props
}) => {
  const formControlContext = useFormControlUnstyledContext();

  // Use `FileUploadRemove` if no override is preset
  if (!action) {
    action = <FileUploadRemove {...removeProps} />;
  }

  // Use `FileUploadHeader` if no override is preset
  if (!header) {
    header = <FileUploadHeader showButton={uploaded} {...headerProps} />;
  }

  // Use `File` if no override is preset
  if (!preview) {
    preview = <FileUploadPreview {...previewProps} />;
  }

  // Use `FileUploadSelect` if no override is preset
  if (!select) {
    select = <FileUploadSelect {...selectProps} />;
  }

  // Toggle "action" display logic
  const view = showActions ? action : preview;

  return (
    <StyledFileUpload className="WmeFileUpload-root" {...props}>
      {header}
      <StyledFileUploadBody error={error || formControlContext?.error}>
        {alert}
        {error || !uploaded ? select : view}
      </StyledFileUploadBody>
    </StyledFileUpload>
  );
};

export default FileUpload;
