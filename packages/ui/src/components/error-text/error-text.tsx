import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TypographyProps } from '@mui/material';

const StyledText = styled(Typography, {
  name: 'WmeErrorText',
  slot: 'Root',
})(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 10,
  marginTop: 8,
}));

const ErrorText: React.FC<TypographyProps> = (props) => {
  const { children } = props;
  const { displayName } = StyledText;

  return (
    <StyledText className="WmeErrorText-root" {...props}>
      {children}
    </StyledText>
  );
};

export default ErrorText;
