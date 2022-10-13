import React from 'react';
import { styled } from '@mui/material/styles';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';

const StyledSetupCardHeader = styled(CardHeader)<CardHeaderProps>(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingBottom: 0,
  paddingLeft: theme.spacing(4),

  '& .MuiCardHeader-title': {
    marginBottom: theme.spacing(1),
  },
}));

StyledSetupCardHeader.defaultProps = {
  titleTypographyProps: { variant: 'h3' },
  subheaderTypographyProps: { variant: 'body2' },
};

export default function SetupCardHeader(props: CardHeaderProps) {
  return <StyledSetupCardHeader className="WmeSetupCardHeader-root" {...props} />;
}
