import type React from 'react';
import {
  Accordion,
  AccordionProps,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/material/styles';
import { SetupCardHeader, SetupCard } from '..';

export interface SetupCardAccordionV2Props extends AccordionProps {
  header?: string,
  subHeader?: string;
  isComplete?: boolean;
  stepNumber?: number;
  children: NonNullable<React.ReactNode>
}

const StyledSetupCardAccordion = styled(Accordion, {
  name: 'WmeSetupCardAccordion',
  slot: 'Root',
})<SetupCardAccordionV2Props>(({ theme }) => ({
  '& .MuiAccordionSummary-root': {
    padding: 0,
    '&.Mui-focusVisible': {
      backgroundColor: 'transparent',
      outline: 'auto',
      outlineColor: theme.palette.primary,
    },
    '& .MuiAccordionSummary-contentGutters': {
      margin: 0,
    },
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    marginRight: 30,
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.primary,
    },
  },
  '& .MuiAccordionDetails-root': {
    paddingLeft: 0,
    paddingRight: 0,
    margin: `0 ${theme.spacing(3)}`,
    borderTop: '1px solid',
    borderColor: theme.palette.border.ui,
    paddingTop: theme.spacing(2),
  },
}));

export default function SetupCardAccordionV2(props: SetupCardAccordionV2Props) {
  const {
    id,
    header,
    subHeader,
    children,
    ...rest
  } = props;

  return (
    <SetupCard>
      <StyledSetupCardAccordion className="WmeSetupCardAccordion-root" {...rest}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={id}
          id={id}
        >
          <SetupCardHeader title={header} subheader={subHeader} />
        </AccordionSummary>
        <AccordionDetails>
          { children }
        </AccordionDetails>
      </StyledSetupCardAccordion>
    </SetupCard>
  );
}
