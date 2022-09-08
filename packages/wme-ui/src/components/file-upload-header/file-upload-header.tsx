import type React from 'react';
import type { Theme } from '@mui/material/styles';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { Box, SxProps, styled } from '@mui/material';
import { InputTitle } from '..';

const StyledFileUploadHeader = styled(Box, {
  name: 'WmeFileUploadHeader',
  slot: 'Root',
})({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  '& .WmeErrorText': {
    cursor: 'pointer',
    marginLeft: 'auto',
  },
});

const StyledButton = styled(ButtonUnstyled, {
  name: 'WmeFileUploadHeaderButton',
  slot: 'Root',
})(({ theme }) => ({
  background: 'none',
  border: 'none',
  color: theme.palette.error.main,
  cursor: 'pointer',
  margin: 0,
  padding: 0,
}));

export interface FileUploadHeaderProps {
  button?: React.ReactElement;
  buttonText?: string;
  labelText?: string;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  showButton?: boolean;
  sx?: SxProps<Theme>;
}

const FileUploadHeader: React.FC<FileUploadHeaderProps> = ({
  button,
  buttonText,
  labelText,
  onRemove,
  showButton,
  ...props
}) => (
  <StyledFileUploadHeader
    className="WmeFileUploadHeader-root"
    {...props}
  >
    {labelText && <InputTitle>{labelText}</InputTitle>}
    {showButton && (button || <StyledButton onClick={onRemove}>{buttonText}</StyledButton>)}
  </StyledFileUploadHeader>
);

export default FileUploadHeader;
