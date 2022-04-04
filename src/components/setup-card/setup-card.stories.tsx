import React from 'react';
import { ComponentMeta } from '@storybook/react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardContent,
  Grid,
  Link,
  Typography,
} from '@mui/material';

import {
  ExpandMore,
  Visibility,
  Abc,
  School,
  LibraryAdd,
} from '@mui/icons-material';

import {
  SetupCard,
  SetupCardHeader,
  SetupCardTask,
  SetupCardList,
  SetupCardListItem,
  SetupCardFooter,
} from '..';

import * as SetupCardHeaderStories from '../setup-card-header/setup-card-header.stories';
import * as SetupCardTaskStories from '../setup-card-task/setup-card-task.stories';

import { theme } from '../../theme';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCard',
  component: SetupCard,
} as ComponentMeta<typeof SetupCard>;

export const Card = () => (
  <SetupCard>
    <SetupCardHeader {...SetupCardHeaderStories.Header.args} />
    <CardContent>
      <SetupCardTask {...SetupCardTaskStories.Task.args} />
      <SetupCardTask {...SetupCardTaskStories.Action.args} />
    </CardContent>
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
  </SetupCard>
);

export const CardWithColumnContent = () => (
  <SetupCard>
    <SetupCardHeader {...SetupCardHeaderStories.Header.args} />
    <CardContent>
      <Grid container columnSpacing={6}>
        <Grid item xs={4}>
          <Typography fontWeight={600} mb={2}>Column One</Typography>
          <SetupCardList>
            <SetupCardListItem title="Testing with icon title" href="#testing-link" icon={<Visibility />} />
            <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Abc />} />
            <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<LibraryAdd />} />
            <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<School />} />
          </SetupCardList>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight={600} mb={2}>Column Two</Typography>
          <SetupCardList>
            <SetupCardListItem title="Testing with icon title" href="#testing-link" icon={<Visibility />} />
            <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Abc />} />
            <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<LibraryAdd />} />
            <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<School />} />
          </SetupCardList>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight={600} mb={2}>Column Three</Typography>
          <SetupCardList>
            <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<LibraryAdd />} />
            <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<School />} />
          </SetupCardList>
        </Grid>
      </Grid>
    </CardContent>
    <SetupCardFooter>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="footer-accordion"
          id="footer-accordion"
        >
          <Typography fontWeight={600} variant="body2">Expand This Section</Typography>
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
              <Typography>
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
  </SetupCard>
);
