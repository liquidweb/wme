import React from 'react';
import {
  Box,
  BoxProps,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CardContentWrapper from './setup-card-task-wrapper';
import SetupCardAction from './setup-card-task-action';
import { showDeprecatedWarning } from '../../utils';

export interface SetupCardTaskProps extends BoxProps {
  title?: string;
  intro?: string;
  icon?: React.ReactNode;
  button?: React.ReactElement;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  taskCta?: string;
  isComplete?: boolean;
  // Deprecated props
  action?: any;
  variant?: any;
  avatar?: any;
}

const Task = styled(Box, {
  name: 'WmeTask',
  slot: 'Root',
})<Pick<SetupCardTaskProps, 'children'>>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',

  '& .MuiCardActionArea-root': {
    padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
  },

  '& .WmeTask-content': {
    display: 'flex',
    alignItems: 'center',
  },

  '& .WmeTask-content-wrapper': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    '&.MuiCardActionArea-root:hover .WmeTaskIcon-wrapper': {
      backgroundColor: theme.palette.background.primary,
    },
  },

  '& .MuiTypography-body1': {
    color: theme.palette.text.disabled,
    fontSize: '0.875rem',
  },
}));

const TaskIcon = styled(Box, {
  name: 'WmeTaskIcon',
  slot: 'Root',
})<Pick<SetupCardTaskProps, 'children'>>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
  marginRight: theme.spacing(2),
  width: 50,
  height: 50,
  backgroundColor: theme.palette.grey[100],
  borderRadius: '50%',
  transition: theme?.transitions?.create(['background-color'], {
    duration: theme.transitions.duration.standard,
  }),
  '& .MuiSvgIcon-root': {
    height: '1.25rem',
    width: '1.25rem',
  },
}));

const SetupCardTask = (props: SetupCardTaskProps) => {
  const {
    title,
    intro,
    icon,
    href,
    onClick,
    button,
    disabled,
    taskCta,
    variant,
    action,
    avatar,
    isComplete,
  } = props;

  showDeprecatedWarning({ variant, action, avatar }, 'Setup Card Task');

  const actionElement = (button && disabled)
    ? React.cloneElement(button, { disabled: true })
    : button;

  return (
    <Task className="WmeTask-root">
      <CardContentWrapper href={href} onClick={onClick} button={button} disabled={disabled}>
        <Box className="WmeTask-content">
          {icon && <TaskIcon className="WmeTaskIcon-wrapper">{icon}</TaskIcon>}
          <Box sx={{ mr: 2 }}>
            {title && <Typography component="h3" variant="taskTitle" mb={1}>{title}</Typography>}
            {intro && <Typography variant="body1">{intro}</Typography>}
          </Box>
        </Box>
        <SetupCardAction button={actionElement} taskCta={taskCta} isComplete={isComplete} />
      </CardContentWrapper>
    </Task>
  );
};

export default SetupCardTask;
