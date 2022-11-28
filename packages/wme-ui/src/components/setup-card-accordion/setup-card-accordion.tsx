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
import type { SetupCardHeaderProps } from '../setup-card-header/setup-card-header';

export interface SetupCardAccordionProps extends AccordionProps, Pick<SetupCardHeaderProps, 'chipBackground' | 'chipText' | 'isComplete'> {
  header?: string,
  subHeader?: string;
  children: NonNullable<React.ReactNode>
}

const StyledSetupCardAccordion = styled(Accordion, {
  name: 'WmeSetupCardAccordion',
  slot: 'Root',
})<SetupCardAccordionProps>(({ theme }) => ({
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
    padding: `0 0 ${theme.spacing(3)} 0`,
    margin: `0 ${theme.spacing(3)}`,
    borderColor: theme.palette.border.ui,
  },
}));

export default function SetupCardAccordion(props: SetupCardAccordionProps) {
  const {
    id,
    header,
    subHeader,
    children,
    chipBackground,
    chipText,
    isComplete,
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
          <SetupCardHeader
            title={header}
            subheader={subHeader}
            chipBackground={chipBackground}
            chipText={chipText}
            isComplete={isComplete}
          />
        </AccordionSummary>
        <AccordionDetails>
          { children }
        </AccordionDetails>
      </StyledSetupCardAccordion>
    </SetupCard>
  );
}
