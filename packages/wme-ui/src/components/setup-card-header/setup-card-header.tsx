import React from 'react';
import { styled } from '@mui/material/styles';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';

const StyledSetupCardHeader = styled(CardHeader)<CardHeaderProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(3),

  '& .MuiCardHeader-title': {
    marginBottom: theme.spacing(1),
  },
  '& .MuiCardHeader-subheader': {
    color: theme.palette.text.disabled,
  },
}));

StyledSetupCardHeader.defaultProps = {
  titleTypographyProps: { variant: 'h3' },
  subheaderTypographyProps: { variant: 'body2' },
};

export default function SetupCardHeader(props: CardHeaderProps) {
  return <StyledSetupCardHeader className="WmeSetupCardHeader-root" {...props} />;
}
