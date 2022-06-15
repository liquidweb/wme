import React from 'react';
import { Box, styled } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, InputHelperText } from '..';

export interface FileUploadRemoveProps {
  buttonText?: string;
  helperText?: string;
  onCancel?: React.MouseEventHandler<HTMLParagraphElement>;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledFileUploadRemove = styled(Box, {
  name: 'WmeFileUploadRemove',
  slot: 'Root',
})({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const FileUploadRemove: React.FC<FileUploadRemoveProps> = ({
  buttonText,
  helperText,
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
    {helperText && (
      <InputHelperText onClick={onCancel} sx={{ cursor: 'pointer' }}>
        {helperText}
      </InputHelperText>
    )}
  </StyledFileUploadRemove>
);

export default FileUploadRemove;
