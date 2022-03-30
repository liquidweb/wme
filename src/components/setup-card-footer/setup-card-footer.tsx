import * as React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const SetupCardFooterWrapper = styled(Box, {
  name: 'WmeSetupCardFooter',
  slot: 'Root',
  overridesResolver: (props, styles) => [
    styles.root,
  ],
})<BoxProps>(({ theme }) => ({
  borderTop: `1px dashed ${theme.palette.grey[500]}`,
  paddingTop: theme.spacing(3),
  paddingRight: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  fontSize: theme.typography.pxToRem(14),

  '& > .MuiGrid-root > .MuiGrid-item': {
    marginRight: theme.spacing(2),
  },

  '& > .MuiGrid-root > .MuiTypography-root': {
    fontWeight: 600,
  },
}));

const SetupCardFooter: React.FC<BoxProps> = (props) => {
  const { children } = props;
  return (
    <SetupCardFooterWrapper>
      { children }
    </SetupCardFooterWrapper>
  );
};

export default SetupCardFooter;