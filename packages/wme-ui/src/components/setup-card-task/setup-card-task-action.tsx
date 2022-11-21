import React from 'react';

import {
  Box,
  BoxProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { styled } from '@mui/system';
import ChevronRight from '@mui/icons-material/ChevronRight';
import type { SetupCardTaskProps } from './setup-card-task';

const ArrowWrapper = styled(Box, {
  name: 'WmeTaskCta',
  slot: 'Root',
})<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  flex: '0 0 auto',
}));

const PopupAction = styled(Typography, {
  name: 'WmeTaskAction',
  slot: 'Action',
})<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '-0.25px',
  lineHeight: '1.625rem',
  opacity: 0,
  transform: 'translateX(-10px)',
  transition: 'all 0.3s ease-in-out',
  color: theme.palette.text.primary,

  '.MuiButtonBase-root:hover &, .Mui-focusVisible &': {
    opacity: 1,
    transform: 'translateX(0)',
  },
}));

const SetupCardAction = (props: Pick<SetupCardTaskProps, 'button' | 'taskCta'>) => {
  const { button, taskCta } = props;

  if (button) {
    return button;
  }

  return (
    <ArrowWrapper>
      <PopupAction variant="body2">{taskCta}</PopupAction>
      <ChevronRight />
    </ArrowWrapper>
  );
};

export default SetupCardAction;
