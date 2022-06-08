import * as React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

interface SetupCardTaskCtaProps extends Omit<ButtonProps, 'variant'|'color'> {}

const StyledSetupCardTaskCta = styled(Button, {
  name: 'WmeSetupCardTaskCta',
  slot: 'root',
})<SetupCardTaskCtaProps>(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  borderStyle: 'dashed',
}));

const SetupCardTaskCta: React.FC<SetupCardTaskCtaProps> = (props) => (
  <StyledSetupCardTaskCta
    className={StyledSetupCardTaskCta.displayName}
    {...props}
    fullWidth
    variant="outlined"
  />
);

export default SetupCardTaskCta;
