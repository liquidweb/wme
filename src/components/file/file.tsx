import React from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Button } from "..";

export interface FileProps {
  filePath?: string;
  imagePath?: string;
  imageAlt?: string;
}

const File: React.FC<FileProps> = ({
  filePath,
  imagePath,
  imageAlt,
}) => {
  if (imagePath) {
    return <img src={imagePath} alt={imageAlt} />;
  }

  return (
    <Button
      color="info"
      disabled
      startIcon={<FileCopyIcon />}
      variant="contained"
    >
      {filePath}
    </Button>
  );
};

export default File;
