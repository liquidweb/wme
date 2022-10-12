import React from 'react';
import { styled } from '@mui/material/styles';
import List, { ListProps } from '@mui/material/List';

const StyledSetupCardList = styled(List, {
  name: 'WmeSetupCardList',
  slot: 'Root',
})<ListProps>(() => ({
  '& .MuiListItem-root': {
    padding: 0,
  },
}));

export default function SetupCardList(props: ListProps) {
  return <StyledSetupCardList className="WmeSetupCardList-root" dense disablePadding {...props} />;
}
