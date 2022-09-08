import type React from 'react';
import {
  Accordion,
  AccordionProps,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/material/styles';

const StyledSetupCardAccordion = styled(Accordion, {
  name: 'WmeSetupCardAccordion',
  slot: 'Root',
})<AccordionProps>(({ theme }) => ({
  '& .MuiAccordionSummary-root.Mui-focusVisible': {
    backgroundColor: 'transparent',
    outline: 'auto',
    outlineColor: theme.palette.primary,
  },
}));

const SetupCardAccordion: React.FC<AccordionProps> = (props) => {
  const {
    id,
    title,
    children,
    ...rest
  } = props;

  return (
    <StyledSetupCardAccordion className="WmeSetupCardAccordion-root" {...rest}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={id}
        id={id}
      >
        <Typography variant="body2" fontWeight="600">{ title }</Typography>
      </AccordionSummary>
      <AccordionDetails>
        { children }
      </AccordionDetails>
    </StyledSetupCardAccordion>
  );
};

export default SetupCardAccordion;
