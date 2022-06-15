import React from 'react';
import { FormControlLabel, FormControlLabelProps, styled } from '@mui/material';

const StyledInputLabel = styled(FormControlLabel, {
  name: 'WmeInputLabel',
  slot: 'Root',
})(({ theme }) => ({
  '& .MuiTypography-root': {
    color: theme.palette.text.primary,
    fontSize: 14,
    textAlign: 'left',
  },
}));

const InputLabel: React.FC<FormControlLabelProps> = (props) => (
  <StyledInputLabel className={StyledInputLabel.displayName} {...props} />
);

export default InputLabel;
