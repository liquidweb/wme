import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip } from '..';
import type { ChipProps } from '../chip';

export interface SetupCardHeaderProps extends BoxProps {
  title?: string;
  subheader?: string;
  chipText?: string;
  isComplete?: boolean;
  chipBackground?: ChipProps['color']
  // Depreacated props
  action?: any;
}

const CardHeader = styled(Box, {
  name: 'WmeCardHeader',
  slot: 'Root',
})<SetupCardHeaderProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  '& .WmeCardHeader-titleRow': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },

  '& .WmeCardTitle': {
    fontWeight: 500,
    marginRight: '5px',
  },
}));

const CompleteCheckmark = styled(CheckCircleIcon, {
  name: 'WmeCheckmark',
  slot: 'Root',
})(({ theme }) => ({
  marginTop: '1px',
  height: '1.25rem',
  width: '1.25rem',
  color: theme.palette.success.main,
}));

function TitleIconHelper(props: Omit<SetupCardHeaderProps, 'title' | 'subheader'>) {
  const { isComplete, chipText, chipBackground } = props;

  if (isComplete) {
    return <CompleteCheckmark />;
  } if (!isComplete && chipText) {
    return <Chip size="small" label={chipText} color={chipBackground || 'info'} />;
  }
  return null;
}

export default function SetupCardHeader(props: SetupCardHeaderProps) {
  const { title, subheader, action } = props;

  if (action) {
    console.error('You are using a deprecated props: action');
  }

  return (
    <CardHeader className="WmeCardHeader-root">
      <Box sx={{ mr: 2 }}>
        <Box className="WmeCardHeader-titleRow">
          <Typography className="WmeCardTitle" component="h3" variant="h3">{title}</Typography>
          <TitleIconHelper {...props} />
        </Box>
        <Typography className="MweCardSubHeader" variant="body1">{subheader}</Typography>
      </Box>
    </CardHeader>
  );
}
