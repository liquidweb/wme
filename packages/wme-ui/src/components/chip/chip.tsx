import React from 'react';
import { styled } from '@mui/material/styles';
import { Chip as MuiChip, ChipProps } from '@mui/material';

export type { ChipProps } from '@mui/material';

const StyledChip = styled(MuiChip)<ChipProps>(({
  size, theme,
}) => ({
  flexDirection: 'row-reverse',
  backgroundColor: theme.palette.info.light,
  color: theme.palette.info.dark,

  '&.Mui-disabled': {
    opacity: 1,
    backgroundColor: theme.palette.background.grey,
    color: theme.palette.text.disabled,
  },

  '& .MuiChip-icon': {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(-0.5),
  },

  ...(size === 'small'
  && {
    '& .MuiChip-icon': {
      marginRight: theme.spacing(0.25),
      marginLeft: theme.spacing(-0.25),
    },
  }),
  '&.MuiChip-colorSuccess': {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
}));

export default function Chip(props: ChipProps) {
  return <StyledChip className="WmeChip-root" {...props} />;
}
