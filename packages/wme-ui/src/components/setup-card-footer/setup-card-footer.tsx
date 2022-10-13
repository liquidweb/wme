import type React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const SetupCardFooterWrapper = styled(Box, {
  name: 'WmeSetupCardFooter',
  slot: 'Root',
  // @ts-ignore: No Unused Parameters - props is passed but not used.
  overridesResolver: (props, styles) => [
    styles.root,
  ],
})<BoxProps>(({ theme }) => ({
  borderTop: `1px dashed ${theme.palette.border.ui}`,
  paddingTop: theme.spacing(3),
  paddingRight: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  paddingBottom: theme.spacing(3),
  fontSize: theme.typography.pxToRem(14),
  '& .MuiAccordion-root': {
    boxShadow: 'none',
  },
  '& .MuiAccordionSummary-root': {
    padding: 0,
    minHeight: 0,
    '&.Mui-expanded': {
      minHeight: 0,
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
  },
  '& .MuiAccordionDetails-root': {
    paddingTop: theme.spacing(3),
    paddingRight: 0,
    paddingLeft: 0,
  },
}));

const SetupCardFooter: React.FC<BoxProps> = (props) => {
  const { children } = props;

  return (
    <SetupCardFooterWrapper className="WmeSetupCardFooter-root">
      { children }
    </SetupCardFooterWrapper>
  );
};

export default SetupCardFooter;
