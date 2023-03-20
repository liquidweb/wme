import React from 'react';

import {
  Box,
  BoxProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircle, ChevronRight, Launch } from '@mui/icons-material';
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

const CompleteCheckmark = styled(CheckCircle, {
  name: 'WmeCheckmark',
  slot: 'Root',
})(({ theme }) => ({
  marginTop: 1,
  height: '1.25rem',
  width: '1.25rem',
  color: theme.palette.success.main,
}));

const SetupCardAction = (props: Pick<SetupCardTaskProps, 'button' | 'target' | 'taskCta' | 'isComplete'>) => {
  const {
    button, target, taskCta, isComplete,
  } = props;

  if (isComplete) {
    return (
      <ArrowWrapper>
        <CompleteCheckmark />
      </ArrowWrapper>
    );
  }

  if (button) {
    return button;
  }

  if (target === '_blank') {
    return (
      <ArrowWrapper>
        <Launch
          sx={{ fontSize: '1rem' }}
        />
      </ArrowWrapper>
    );
  }

  return (
    <ArrowWrapper>
      <PopupAction variant="body2">{taskCta}</PopupAction>
      <ChevronRight />
    </ArrowWrapper>
  );
};

export default SetupCardAction;
