import React from 'react';
import {
  Box,
  Input,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '../button';
import FormHelperText from '../form-helper-text';
import InputTitle from '../input-title';

/**
 * FileUpload also contains two other components, TitleContainer and UploadedFile.
 *
 * These components should not be used independently, however. They're broken up to improve
 * the developer experience.
 *
 * All actions should be built out on an individual basis per component.
*/

interface FileUploadProps {
  label?: string,
  image?: string,
  file?: string,
  imageAlt?: string,
  deleteButtonText?: string,
  showSelectedFileActions?: boolean,
  handleDeleteFile?: any,
  handleFileActions?: any,
  nevermind?: string,
  buttonText?: string,
  subText?: string,
  helperText?: string,
  selectedFile?: boolean,
  handleUploadedFile?: any,
  error?: boolean,
  errorMessage?: string,
}

interface UploadedFileProps {
  image?: string,
  file?: string,
  imageAlt?: string,
  showSelectedFileActions?: boolean,
  handleDeleteFile?: any,
  handleFileActions?: any,
  nevermind?: string,
  deleteButtonText?: string,
}

interface TitleContainerProps {
  label?: string,
  error?: boolean,
  errorMessage?: string,
  selectedFile?: boolean,
  handleFileActions?: any,
  deleteButtonText?: string,
}

const Container = styled(Box, {
  name: 'WmeFileUploadContainer',
  slot: 'Root',
})(() => ({
  width: 415,
}));

const StyledTitleContainer = styled(Box, {
  name: 'WmeTitleContainer',
  slot: 'Root',
})(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const ErrorText = styled(Box, {
  name: 'WmeErrorText',
  slot: 'Root',
})(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: 'auto',
  fontSize: 10,
}));

const FileUploadBox = styled(Box, {
  name: 'WmeFileUploadBox',
  slot: 'Root',
})<FileUploadProps>(({ error, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderRadius: 4,
  minHeight: 106,
  width: 415,
  border: error ? `1px dashed ${theme.palette.error.main}` : '1px dashed #C4C4C4',
}));

const UploadedFile: React.FC<UploadedFileProps> = (props) => {
  const {
    image,
    file,
    imageAlt,
    showSelectedFileActions,
    handleDeleteFile,
    handleFileActions,
    nevermind = 'Nevermind',
    deleteButtonText = 'Delete',
  } = props;

  if (showSelectedFileActions) {
    return (
      <>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteFile}
          startIcon={<DeleteIcon />}
        >
          {deleteButtonText}
        </Button>
        <FormHelperText onClick={handleFileActions} sx={{ cursor: 'pointer' }}>
          {nevermind}
        </FormHelperText>
      </>
    );
  }

  if (image) {
    return (
      <img src={image} alt={imageAlt} />
    );
  }
  return (
    <Button
      variant="contained"
      color="info"
      disabled
      startIcon={<FileCopyIcon />}
    >
      {file}
    </Button>
  );
};

const TitleContainer: React.FC<TitleContainerProps> = (props) => {
  const {
    label,
    error,
    errorMessage,
    selectedFile,
    handleFileActions,
    deleteButtonText = 'Delete',
  } = props;

  return (
    <StyledTitleContainer>
      <InputTitle>{label}</InputTitle>
      {
        error
        && (
          <ErrorText>{errorMessage}</ErrorText>
        )
      }
      {
        selectedFile && !error
        && (
          <ErrorText onClick={handleFileActions} sx={{ cursor: 'pointer' }}>{deleteButtonText}</ErrorText>
        )
      }
    </StyledTitleContainer>
  );
};

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const {
    label,
    buttonText,
    helperText,
    selectedFile,
    handleUploadedFile,
    error,
  } = props;

  return (
    <Container>
      {
        label
        && <TitleContainer {...props} />
      }
      <FileUploadBox error={error}>
        {
          !selectedFile || error
            ? (
              <>
                <Input
                  id="buttonId"
                  sx={visuallyHidden}
                  type="file"
                  onChange={handleUploadedFile}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                >
                  {buttonText}
                </Button>
              </>
            )
            : (
              <UploadedFile {...props} />
            )
        }
      </FileUploadBox>
      {
        helperText
        && <FormHelperText>{helperText}</FormHelperText>
      }
    </Container>
  );
};

export default FileUpload;