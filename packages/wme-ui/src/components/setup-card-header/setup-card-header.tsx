import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip } from '..';
import type { ChipProps } from '../chip';
import { showDeprecatedWarning } from '../../../utils';

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
  padding: theme.spacing(3),
  '& .WmeCardHeader-titleRow': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },

  '& .WmeCardTitle': {
    fontWeight: 500,
    marginRight: 5,
  },
  '& .MweCardSubHeader': {
    fontSize: '0.875rem',
    color: theme.palette.text.disabled,
  },
}));

const CompleteCheckmark = styled(CheckCircleIcon, {
  name: 'WmeCheckmark',
  slot: 'Root',
})(({ theme }) => ({
  marginTop: 1,
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

  showDeprecatedWarning({ action }, 'Setup Card Header');

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
