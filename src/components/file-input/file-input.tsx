import React from 'react';
import { InputBase, InputBaseProps, styled } from '@mui/material';

const StyledFileInput = styled(InputBase, {
  name: 'WmeFileInput',
  slot: 'Root',
})({});

const FileInput: React.FC<InputBaseProps> = (props) => (
  <StyledFileInput
    type="file"
    className="WmeFileInput-root"
    {...props}
  />
);

export default FileInput;
