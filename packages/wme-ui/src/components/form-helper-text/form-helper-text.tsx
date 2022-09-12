import type React from 'react';
import { styled } from '@mui/material/styles';
import { FormHelperText as MuiFormHelperText, FormHelperTextProps as MuiFormHelperTextProps } from '@mui/material';

interface FormHelperTextProps extends MuiFormHelperTextProps {
  onClick?: () => void;
}

const StyledFormHelperText = styled(MuiFormHelperText, {
  name: 'WmeFormHelperText',
  slot: 'Root',
})({
  fontSize: 10,
  marginLeft: 0,
});

const FormHelperText: React.FC<FormHelperTextProps> = (props) => {
  const { children } = props;

  return (
    <StyledFormHelperText className="WmeFormHelperText-root" {...props}>
      {children}
    </StyledFormHelperText>
  );
};

export default FormHelperText;
