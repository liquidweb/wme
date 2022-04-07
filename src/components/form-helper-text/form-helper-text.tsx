import React from 'react';
import { styled } from '@mui/material/styles';
import { FormHelperText as MuiFormHelperText } from '@mui/material';

const StyledFormHelperText = styled(MuiFormHelperText, {
  name: 'WmeFormHelperText',
  slot: 'Root',
})({
  fontSize: 10,
  marginLeft: 0,
});

const FormHelperText: React.FC = (props) => {
  const { children } = props;
  return (
    <StyledFormHelperText>
      {children}
    </StyledFormHelperText>
  );
};

export default FormHelperText;
