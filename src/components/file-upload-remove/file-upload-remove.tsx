import React from 'react';
import { Box, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, InputHelperText } from '..';

export interface FileUploadRemoveProps {
  buttonText?: string;
  cancelText?: string;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledFileUploadRemove = styled(Box, {
  name: 'WmeFileUploadRemove',
  slot: 'Root',
})({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
});

const FileUploadRemove: React.FC<FileUploadRemoveProps> = ({
  buttonText,
  cancelText,
  onCancel,
  onRemove,
  ...props
}) => (
  <StyledFileUploadRemove
    className={StyledFileUploadRemove.displayName}
    {...props}
  >
    <Button
      color="error"
      onClick={onRemove}
      startIcon={<DeleteIcon />}
      variant="contained"
    >
      {buttonText || 'Delete'}
    </Button>
    {cancelText && (
      <Button onClick={onCancel} sx={{ color: 'text.primary', ml: 1 }}>
        {cancelText}
      </Button>
    )}
  </StyledFileUploadRemove>
);

export default FileUploadRemove;
