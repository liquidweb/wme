import React from 'react';
import { styled } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';

const StyledSetupCard = styled(Card, {
  name: 'WmeSetupCard',
  slot: 'Root',
})<CardProps>(({ theme }) => ({
  marginRight: 'auto',
  marginLeft: 'auto',
  maxWidth: theme.spacing(100),
  boxShadow: '0 0 32px rgba(0, 0, 0, 0.1)',

  '& .MuiCardContent-root': {
    marginTop: theme.spacing(4),
    paddingTop: 0,
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
}));

export default function SetupCard(props: CardProps) {
  return <StyledSetupCard {...props} />;
}
