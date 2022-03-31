import React from 'react';
import { styled } from '@mui/material/styles';
import List, { ListProps } from '@mui/material/List';

const StyledSetupCardList = styled(List, {
  name: 'WmeSetupCardList',
  slot: 'Root',
})<ListProps>(({ theme }) => ({
  '& .MuiListItemIcon-root': {
    minWidth: theme.spacing(3.5),
  },
  '& .MuiListItemIcon-root svg': {
    fontSize: '1.25em',
  },
  '& .MuiListItem-root': {
    padding: 0,
  },
}));

export default function SetupCardList(props: ListProps) {
  return <StyledSetupCardList dense disablePadding {...props} />;
}
