import React from 'react';
import { styled, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';

interface CardSelectGroupProps extends ToggleButtonGroupProps {}

const StyleCardSelectGroup = styled(ToggleButtonGroup, {
  name: 'WmeCardSelectGroup',
  slot: 'Root',
})(({ orientation, theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),

  '& .MuiButtonBase-root.WmeCardSelectItem-root': {
    display: 'flex',
    textTransform: 'none',
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${theme.palette.border.ui}`,
  },

  '& .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    marginLeft: 0,
  },

  '& .MuiToggleButtonGroup-grouped.MuiToggleButtonGroup-groupedHorizontal': {
    // border: '1px solid red',
  },

  '& .MuiToggleButtonGroup-groupedHorizontal': {
    flexDirection: 'column',
  },

  ...(orientation === 'vertical' && {
    '& .WmeCardSelectItem-icon': {
      marginRight: theme.spacing(2),
    },
    '& .MuiToggleButtonGroup-grouped': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    '& .WmeCardSelectItem-content': {
      textAlign: 'left',
    },
  }),
}));

export default function CardSelectGroup(props: CardSelectGroupProps) {
  return <StyleCardSelectGroup className="WmeCardSelectGroup-root" {...props} />;
}
