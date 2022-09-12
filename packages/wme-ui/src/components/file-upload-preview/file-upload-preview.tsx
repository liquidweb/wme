import type React from 'react';
import { Box, styled } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button } from '..';

export interface FileUploadPreviewProps {
  filePath?: string;
  imagePath?: string;
  imageAlt?: string;
}

const StyledFileUploadPreview = styled(Box, {
  name: 'WmeFilePreview',
  slot: 'Root',
})({});

const FileUploadPreview: React.FC<FileUploadPreviewProps> = ({
  filePath,
  imagePath,
  imageAlt,
  ...props
}) => (
  <StyledFileUploadPreview
    className="WmeFilePreview-root"
    {...props}
  >
    {imagePath ? (
      <img src={imagePath} alt={imageAlt} />
    ) : (
      <Button
        color="info"
        disabled
        startIcon={<FileCopyIcon />}
        variant="contained"
      >
        {filePath}
      </Button>
    )}
  </StyledFileUploadPreview>
);

export default FileUploadPreview;
