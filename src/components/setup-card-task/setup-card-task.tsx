import * as React from 'react';
import {
  Box, BoxProps, CardActionArea, Typography,
  Avatar, AvatarProps,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Button from '../button';

import { ConditionalWrapper, pxToRem } from '../../utils';

/* eslint-disable no-unused-vars */
interface TaskButton {
  label: string;
  url: string;
  backgroundColor: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface SetupCardProps extends BoxProps {
  title?: string;
  intro?: string;
  children?: React.ReactNode;
  button?: TaskButton;
  taskCta?: string;
  disabled?: boolean;
  avatarProps?: AvatarProps;
  variant?: 'action' | 'task' | undefined;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
/* eslint-enable no-unused-vars */

interface TaskProps extends BoxProps {
  variant?: 'action' | 'task' | undefined;
  button?: boolean;
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

      '& > button': {
        display: 'flex',
        padding: theme.spacing(1.5),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 1,
      },

      '& > button:hover .MuiAvatar-root': {
        backgroundColor: theme.palette.common.white,
      },
    }
  ),
}));

const SetupCardTaskCta = styled(Box, {
  name: 'WmeTaskCta',
  slot: 'Root',
})<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  flex: '0 0 auto',
}));

const SetupCardTask: React.FC<SetupCardProps> = (props) => {
  const {
    title, intro, button, avatarProps, variant, taskCta, onClick, children, disabled = false,
  } = props;
  const variantType = variant === 'action' ? 'action' : 'task';

  return (
    <Task variant={variantType}>
      <ConditionalWrapper
        condition={variantType === 'task'}
        wrapper={
          (child: React.ReactNode) => (
            <CardActionArea onClick={onClick}>{child}</CardActionArea>
          )
        }
      >
        <Avatar {...avatarProps} />
        <Box sx={{ mr: 2 }}>
          {title && <Typography component="h3" variant="h4" mb={1}>{title}</Typography>}
          {intro && <Typography variant="body2">{intro}</Typography>}
          {children}
        </Box>
        {variantType === 'action' ? (
          <Button
            disabled={disabled}
            variant="contained"
            href={button?.url}
            onClick={onClick}
            sx={{ marginLeft: 'auto', flex: '0 0 auto' }}
          >
            {button?.label}
          </Button>
        )
          : (
            <SetupCardTaskCta>
              <Typography
                variant="body2"
                sx={{
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
                }}
                className="sb-get-started__text"
              >
                {taskCta}
              </Typography>
              <ChevronRight />
            </SetupCardTaskCta>
          )}
      </ConditionalWrapper>
    </Task>
  );
};

export default SetupCardTask;
