import type React from 'react';

import {
  Box,
  BoxProps,
  CardActionArea,
  Typography,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

export interface SetupCardTaskV2Props extends BoxProps {
  href?: string;
  title?: string;
  intro?: string;
  avatar?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  isComplete?: boolean;
}

const Task = styled(Box, {
  name: 'WmeTask',
  slot: 'Root',
})<SetupCardTaskV2Props>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',

  '& .MuiButtonBase-root': {
    padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
  },

  '& .MuiCardActionArea-root': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5),
  },

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
  '& .MuiSvgIcon-root': {
    height: '1.2rem',
    width: '1.2rem',
  },

  '& .MuiTypography-body1': {
    color: theme.palette.text.disabled,
  },
}));

const CompleteCheckmark = styled(CheckCircleIcon, {
  name: 'WmeCheckmark',
  slot: 'Root',
})(({ theme }) => ({
  height: '1.5rem',
  width: '1.5rem',
  color: theme.palette.success.main,
}));

const ActionIcon = ({ isComplete }: { isComplete?: boolean}) => {
  if (isComplete) {
    return <CompleteCheckmark />;
  }
  return <ArrowForwardIcon />;
};

const SetupCardTaskV2 = (props: SetupCardTaskV2Props) => {
  const {
    title,
    intro,
    avatar,
    href,
    onClick,
    isComplete,
  } = props;

  return (
    <Task className="WmeTask-root">
      <CardActionArea {...(href ? { href } : {})} {...(onClick ? { onClick } : {})}>
        {avatar && avatar}
        <Box sx={{ mr: 2 }}>
          {title && <Typography component="h3" variant="taskTitle" mb={1}>{title}</Typography>}
          {intro && <Typography variant="body1">{intro}</Typography>}
        </Box>
        <ActionIcon isComplete={isComplete} />
      </CardActionArea>
    </Task>
  );
};

export default SetupCardTaskV2;
