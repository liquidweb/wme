import * as React from 'react';
import {
  Box,
  BoxProps,
  CardActionArea,
  CardActionAreaProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import { ChevronRight, ConnectingAirportsOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { ConditionalWrapper, pxToRem } from '../../utils';

type TaskVariant = 'action' | 'task' | undefined;

interface SetupCardProps extends BoxProps {
  href?: string;
  title?: string;
  intro?: string;
  children?: React.ReactNode;
  button?: any;
  taskCta?: string;
  disabled?: boolean;
  avatar?: React.ReactNode;
  variant?: TaskVariant;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
/* eslint-enable no-unused-vars */

interface CtaActionRootProps {
  taskCta?: string;
}

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

  ...(variant === 'action'
    && {
      '& .MuiButtonGroup-root, & .WmeButtonGroupRoot, & .MuiButton-root, & .WmeButtonRoot': {
        marginLeft: 'auto',
        flex: '0 0 auto',

        '&:hover': {
          color: theme.palette.common.white,
        },
      },
    }
  ),

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

const TaskActionArea = styled(CardActionArea)<TaskActionAreaProps>(({ theme }) => ({
  '&.Mui-focusVisible': {
    boxShadow: 'none',
    outline: 'none',
  },
  '& .MuiCardActionArea-focusHighlight': {
    backgroundColor: theme.palette.grey[600],
  },
}));

const CtaActionRoot = (props: CtaActionRootProps) => {
  const { taskCta } = props;
  return (
    <SetupCardTaskCta className="WmeTaskCta-root">
      <CtaAction className="WmeTaskCta-action" variant="body2">
        {taskCta}
      </CtaAction>
      <ChevronRight />
    </SetupCardTaskCta>
  );
};

const SetupCardTask: React.FC<SetupCardProps> = (props) => {
  const {
    href = '',
    title,
    intro,
    button: buttonProp,
    avatar,
    variant,
    taskCta,
    onClick,
    children,
    disabled = false,
  } = props;

  // Check that `button` is React Element and `variant` is `action`.
  const variantType = React.isValidElement(buttonProp) && variant === 'action' ? 'action' : 'task';

  // If SetupCardTask is `disabled` add `disabled` prop to
  let button = (buttonProp && disabled)
    ? React.cloneElement(buttonProp as React.ReactElement<any>, { disabled: true })
    : buttonProp;

  const { props: buttonProps } = button || {};

  // If button has no `onClick` handler, we attribute the parent `onClick` handler.
  button = (button && (typeof buttonProps === 'object' && !('onClick' in buttonProps)))
    ? React.cloneElement(button as React.ReactElement<any>, { onClick })
    : button;

  // If button and no button href is defined, we attribute the parent `href` prop to button.
  button = (button && href.length && (typeof buttonProps === 'object' && !('href' in buttonProps)))
    ? React.cloneElement(button as React.ReactElement<any>, { href })
    : button;

  return (
    <Task className="WmeTask-root" variant={variantType}>
      <ConditionalWrapper
        condition={variantType === 'task'}
        wrapper={
          (child: React.ReactNode) => (
            <TaskActionArea
              className="WmeTaskActionArea-root"
              onClick={onClick}
              disabled={disabled}
              href={href}
            >
              {child}
            </TaskActionArea>
          )
        }
      >
        {avatar}
        <Box sx={{ mr: 2 }}>
          {title && <Typography component="h3" variant="taskTitle" mb={1}>{title}</Typography>}
          {intro && <Typography variant="body2">{intro}</Typography>}
          {children}
        </Box>
        {variantType === 'action' ? button : <CtaActionRoot taskCta={taskCta} />}
      </ConditionalWrapper>
    </Task>
  );
};

export default SetupCardTask;
