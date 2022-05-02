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
import { ExpandMore, Visibility } from '@mui/icons-material';
import { theme } from '../../theme';
import { SetupCardFooter, SetupCardList, SetupCardListItem } from '..';

export default {
  title: 'Setup Cards/SetupCardFooter',
  component: SetupCardFooter,
  decorators: [(story) => <div style={{ maxWidth: 800, margin: '0 auto' }}>{story()}</div>],
} as ComponentMeta<typeof SetupCardFooter>;

export const FooterWithLinks = () => (
  <SetupCardFooter>
    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
      <Grid item>
        <Typography fontWeight={600} variant="body1">Footer Message?</Typography>
      </Grid>
      <Grid item>
        <Link href="#link-one" variant="body1">Link One</Link>
      </Grid>
      <Grid item>
        <Link href="#link-two" variant="body1">Link Two</Link>
      </Grid>
      <Grid item>
        <Link href="#link-three" variant="body1">Link Three</Link>
      </Grid>
    </Grid>
  </SetupCardFooter>
);

export const FooterWithText = () => (
  <SetupCardFooter>
    <Typography fontWeight={600} variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam erat felis, consectetur et velit non, fermentum vulputate sapien. Morbi rhoncus a metus et scelerisque.</Typography>
  </SetupCardFooter>
);

export const FooterWithAccordion = () => (
  <SetupCardFooter>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="footer-accordion"
        id="footer-accordion"
      >
        <Typography fontWeight={600} variant="body1">Expand This Section</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <img
              style={{ width: '100%', height: 'auto', borderRadius: theme.shape.borderRadius }}
              src="https://picsum.photos/600/250"
              alt="Test"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="overline">3 Minutes</Typography>
            <Typography variant="h3" mb={1}>
              Lorem ipsum dolor sit ametconsectetur adipiscing elit
            </Typography>
            <Typography variant="caption">
              Duis mollis, est non commodo luctus, nisi erat porttitor
              ligula, eget lacinia odio sem nec elit. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam.
            </Typography>
          </Grid>
        </Grid>
        <Grid container rowSpacing={3} columnSpacing={8} mt={0}>
          <Grid item md={4}>
            <Typography fontWeight={600} mb={2}>Column One</Typography>
            <SetupCardList>
              <SetupCardListItem title="Testing with icon title" href="#testing-link" icon={<Visibility />} />
              <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Visibility />} />
              <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Visibility />} />
              <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Visibility />} />
            </SetupCardList>
          </Grid>
          <Grid item md={4}>
            <Typography fontWeight={600} mb={2}>Column Two</Typography>
            <SetupCardList>
              <SetupCardListItem title="Testing with icon title" href="#testing-link" icon={<Visibility />} />
              <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Visibility />} />
              <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Visibility />} />
              <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Visibility />} />
            </SetupCardList>
          </Grid>
          <Grid item md={4}>
            <Typography fontWeight={600} mb={2}>Column Three</Typography>
            <SetupCardList>
              <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Visibility />} />
              <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Visibility />} />
            </SetupCardList>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  </SetupCardFooter>
);
