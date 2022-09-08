import { Typography, LinearProgress, LinearProgressProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledProgressBarWrapper = styled('div', {
  name: 'WmeProgressBar',
  slot: 'Root',
})(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const StyledProgressBar = styled(LinearProgress, {
  name: 'WmeProgressBar',
  slot: 'Progress',
  shouldForwardProp: (prop) => prop !== 'statusMessage',
})(() => ({
  flexGrow: 1,
}));

const StyledProgressBarPercentage = styled(Typography, {
  name: 'WmeProgressBar',
  slot: 'Percentage',
})(({ theme }) => ({
  minWidth: theme.spacing(3),
  marginLeft: theme.spacing(1),
  textAlign: 'right',
}));

const StyledProgressBarStatusMessage = styled(Typography, {
  name: 'WmeProgressBar',
  slot: 'Status',
})(({ theme }) => ({
  flex: '0 0 100%',
  color: theme.palette.text.secondary,
}));

interface ProgressBarProps extends LinearProgressProps {
  statusMessage?: string;
}

export default function ProgressBar(props: ProgressBarProps) {
  const { value, statusMessage } = props;
  const percentage = typeof value !== 'undefined' ? Math.round(value) : 0;
  return (
    <StyledProgressBarWrapper className="WmeProgressBar-root">
      <StyledProgressBar
        aria-label="progress bar"
        variant="determinate"
        className="WmeProgressBar-progress"
        {...props}
      />
      <StyledProgressBarPercentage
        variant="caption"
        className="WmeProgressBar-percentage"
      >
        {`${percentage}%`}
      </StyledProgressBarPercentage>
      { statusMessage
      && (
        <StyledProgressBarStatusMessage
          className="WmeProgressBar-status"
          variant="caption"
        >
            {statusMessage}
        </StyledProgressBarStatusMessage>
      )}
    </StyledProgressBarWrapper>
  );
}
