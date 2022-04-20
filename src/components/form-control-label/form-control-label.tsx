import React, { ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import { FormControlLabel as MuiFormControlLabel } from '@mui/material';

interface FormControlProps {
  control: ReactElement;
  label: string;
  value?: string;
}

const StyledFormControlLabel = styled(MuiFormControlLabel, {
  name: 'WmeFormControlLabel',
  slot: 'Root',
})(() => ({
  '& .MuiTypography-root': {
    fontSize: 14,
  },
}));

const FormControlLabel: React.FC<FormControlProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <StyledFormControlLabel {...rest}>
      {children}
    </StyledFormControlLabel>
  );
};

export default FormControlLabel;
