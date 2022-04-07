import React from 'react';
import {
  Box,
  Input,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Button from '../button';
import FormHelperText from '../form-helper-text';
import InputTitle from '../input-title';

interface FileUploadProps {
  label?: string,
  buttonText?: string,
  subText?: string,
  helperText?: string,
  selectedFile: boolean,
  image?: string,
  imageAlt?: string,
  file?: string,
  handleUploadedFile?: any,
}

interface UploadedFileProps {
  image?: string,
  file?: string,
  imageAlt?: string,
}

const Container = styled(Box, {
  name: 'WmeFileUploadContainer',
  slot: 'Root',
})(() => ({
  width: 415,
}));

const FileUploadBox = styled(Box, {
  name: 'WmeFileUploadContainer',
  slot: 'Root',
})(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  border: '1px dashed #C4C4C4',
  borderRadius: 4,
  minHeight: 106,
  width: 415,
}));

const UploadedFile: React.FC<UploadedFileProps> = (props) => {
  const { image, file, imageAlt } = props;

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

const FileUpload: React.FC<FileUploadProps> = (props) => {
  const {
    label,
    buttonText,
    helperText,
    selectedFile,
    handleUploadedFile,
    ...rest
  } = props;

  return (
    <Container>
      {
        label
        && <InputTitle>{label}</InputTitle>
      }
      <FileUploadBox>
        {
          !selectedFile
            ? (
              <>
                <Input
                  onChange={handleUploadedFile}
                  id="buttonId"
                  sx={visuallyHidden}
                  type="file"
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
            : <UploadedFile {...rest} />
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
