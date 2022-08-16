import React from 'react';
import { InputBase, InputBaseComponentProps, styled } from '@mui/material';

const StyledFileInput = styled(InputBase, {
  name: 'WmeFileInput',
  slot: 'Root',
})({});

const FileInput: React.FC<InputBaseComponentProps> = (props) => (
  <StyledFileInput
    type="file"
    className="WmeFileInput-root"
    inputProps={props}
  />
);

export default FileInput;
