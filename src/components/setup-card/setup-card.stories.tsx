import React from 'react';
import { ComponentMeta } from '@storybook/react';
import {
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import {
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
} from '..';

import * as SetupCardHeaderStories from '../setup-card-header/setup-card-header.stories';
import * as SetupCardTaskStories from '../setup-card-task/setup-card-task.stories';

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
  </SetupCard>
);
