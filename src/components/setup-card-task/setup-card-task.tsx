import * as React from 'react';
import {
  Box,
  BoxProps,
  CardActionArea,
  CardActionAreaProps,
  Typography,
  TypographyProps,
  Avatar,
  AvatarProps,
  ButtonProps,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button } from '..';

import { ConditionalWrapper, pxToRem } from '../../utils';

type TaskVariant = 'action' | 'task' | undefined;

/* eslint-disable no-unused-vars */
interface TaskButton extends ButtonProps {
  label: string;
  url: string;
  backgroundColor: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface SetupCardProps extends BoxProps {
  id: string;
  url?: string;
  title?: string;
  intro?: string;
  children?: React.ReactNode;
  button?: TaskButton;
  taskCta?: string;
  disabled?: boolean;
  avatarProps?: AvatarProps;
  variant?: TaskVariant;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
/* eslint-enable no-unused-vars */

interface TaskProps extends BoxProps {
  variant?: TaskVariant;
  button?: boolean;
}

interface TaskActionAreaProps extends CardActionAreaProps {
  href?: string;
}

const Task = styled(Box, {
  name: 'WmeTask',
  slot: 'Root',
})<TaskProps>(({ variant, theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),

  '&:first-of-type': {
    marginTop: 0,
  },

  '&:last-of-type': {
    marginBottom: 0,
  },

  '& .MuiAvatar-root': {
    position: 'relative',
    zIndex: 1,
    marginRight: theme.spacing(2),
    width: 64,
    height: 64,
    backgroundColor: theme.palette.grey[100],
    transition: theme?.transitions?.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    }),
  },

  ...(variant === 'task'
    && {
      marginTop: theme.spacing(2.5),
      marginBottom: theme.spacing(-1.5),
      marginRight: theme.spacing(-1.5),
      marginLeft: theme.spacing(-1.5),

      '& > button, & > a': {
        display: 'flex',
        padding: theme.spacing(1.5),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius,
      },

      '& > button:hover .MuiAvatar-root, & > a:hover .MuiAvatar-root': {
        backgroundColor: theme.palette.common.white,
      },

      '& > a:focus': {
        outline: 'none',
      },
    }
  ),
}));

const SetupCardTaskCta = styled(Box, {
  name: 'WmeTaskCta',
  slot: 'Root',
})<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  flex: '0 0 auto',
  color: theme.palette.text.primary,
}));

const CtaAction = styled(Typography, {
  name: 'WmeTaskCta',
  slot: 'Action',
})<TypographyProps>(() => ({
  fontWeight: 600,
  letterSpacing: '-0.25px',
  lineHeight: pxToRem(26),
  opacity: 0,
  transform: 'translateX(-10px)',
  transition: 'all 0.3s ease-in-out',

  '.MuiButtonBase-root:hover &, .Mui-focusVisible &': {
    opacity: 1,
    transform: 'translateX(0)',
  },
}));

const CtaActionButton = styled(Button, {
  name: 'WmeTaskCta',
  slot: 'Button',
})<ButtonProps>(({ theme }) => ({
  marginLeft: 'auto',
  flex: '0 0 auto',

  '&:hover': {
    color: theme.palette.common.white,
  },
}));

const TaskActionArea = styled(CardActionArea)<TaskActionAreaProps>(({ theme }) => ({
  '&.Mui-focusVisible': {
    boxShadow: 'none',
    outline: 'none',
  },
  '& .MuiCardActionArea-focusHighlight': {
    backgroundColor: theme.palette.grey[600],
  },
}));

const SetupCardTask: React.FC<SetupCardProps> = (props) => {
  const {
    id,
    url = '',
    title,
    intro,
    button,
    avatarProps,
    variant,
    taskCta,
    onClick,
    children,
    disabled = false,
  } = props;
  const variantType = variant === 'action' ? 'action' : 'task';

  return (
    <Task className={Task.displayName} variant={variantType}>
      <ConditionalWrapper
        condition={variantType === 'task'}
        wrapper={
          (child: React.ReactNode) => (
            <TaskActionArea
              className={TaskActionArea.displayName}
              onClick={onClick}
              disabled={disabled}
              href={url}
            >
              {child}
            </TaskActionArea>
          )
        }
      >
        <Avatar {...avatarProps} />
        <Box sx={{ mr: 2 }}>
          {title && <Typography component="h3" variant="taskTitle" mb={1}>{title}</Typography>}
          {intro && <Typography variant="body2">{intro}</Typography>}
          {children}
        </Box>
        {variantType === 'action' ? (
          <CtaActionButton
            className={CtaActionButton.displayName}
            disabled={button?.disabled || disabled}
            variant="contained"
            href={button?.url}
            onClick={onClick}
            sx={{ backgroundColor: button?.backgroundColor ? button.backgroundColor : null }}
          >
            {button?.label}
          </CtaActionButton>
        )
          : (
            <SetupCardTaskCta className={SetupCardTaskCta.displayName}>
              <CtaAction className={CtaAction.displayName} variant="body2">
                {taskCta}
              </CtaAction>
              <ChevronRight />
            </SetupCardTaskCta>
          )}
      </ConditionalWrapper>
    </Task>
  );
};

export default SetupCardTask;
