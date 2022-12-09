import type React from 'react';
import { CardContent, CardContentProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const SetupCardContentWrapper = styled(CardContent, {
  name: 'WmeSetupCardContent',
  slot: 'Root',
})(({ theme }) => ({
  padding: `${theme.spacing(2)} 0 ${theme.spacing(3)} 0`,
  margin: `0 ${theme.spacing(3)}`,
  borderTop: '1px solid',
  borderColor: theme.palette.border.ui,
}));

const SetupCardContent: React.FC<CardContentProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <SetupCardContentWrapper className="WmeSetupCardContent-root" {...rest}>
      { children }
    </SetupCardContentWrapper>
  );
};

export default SetupCardContent;
