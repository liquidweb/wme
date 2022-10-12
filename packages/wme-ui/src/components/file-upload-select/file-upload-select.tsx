import type React from 'react';
import {
  Box,
  InputBaseComponentProps,
  styled,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import type { WmeButtonProps } from '../button/button';
import { Button, FileInput, FormHelperText } from '..';

const StyledFileUploadSelect = styled(Box, {
  name: 'WmeFileUploadSelect',
  slot: 'Root',
})({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '& .MuiInputBase-input': visuallyHidden,
});

export interface FileUploadSelectProps {
  buttonText?: string;
  buttonProps?: WmeButtonProps;
  helperText?: string;
  inputProps?: InputBaseComponentProps;
}

const FileUploadSelect: React.FC<FileUploadSelectProps> = ({
  buttonText,
  buttonProps,
  helperText,
  inputProps,
  ...props
}) => (
  <StyledFileUploadSelect
    className="WmeFileUploadSelect-root"
    {...props}
  >
    <label htmlFor={inputProps?.id}>
      <FileInput {...inputProps} />
      <Button color="primary" startIcon={<AddIcon />} variant="contained" component="span" {...buttonProps}>
        {buttonText || 'Add File'}
      </Button>
    </label>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </StyledFileUploadSelect>
);

export default FileUploadSelect;
