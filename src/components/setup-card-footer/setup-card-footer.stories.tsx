import React from 'react';
import { ComponentMeta } from '@storybook/react';
import {
  Grid,
  Link,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { SetupCardFooter } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCardFooter',
  component: SetupCardFooter,
} as ComponentMeta<typeof SetupCardFooter>;

export const FooterWithLinks = () => (
  <SetupCardFooter>
    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
      <Grid item>
        <Typography fontWeight={600} variant="body2">Footer Message?</Typography>
      </Grid>
      <Grid item>
        <Link href="#link-one" variant="body2">Link One</Link>
      </Grid>
      <Grid item>
        <Link href="#link-two" variant="body2">Link Two</Link>
      </Grid>
      <Grid item>
        <Link href="#link-three" variant="body2">Link Three</Link>
      </Grid>
    </Grid>
  </SetupCardFooter>
);

export const FooterWithText = () => (
  <SetupCardFooter>
    <Typography fontWeight={600} variant="body2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat felis, consectetur et velit non, fermentum vulputate sapien. Morbi rhoncus a metus et scelerisque.</Typography>
  </SetupCardFooter>
);

export const FooterWithAccordion = () => (
  <SetupCardFooter>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="footer-accordion"
        id="footer-accordion"
      >
        <Typography fontWeight={600} variant="body2">Expand This Section</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <img src="https://picsum.photos/600/250" alt="Test" />
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>

  </SetupCardFooter>
);
