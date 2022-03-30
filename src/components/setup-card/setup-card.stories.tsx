import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  Grid,
  CardContent,
  Link,
  Typography,
} from '@mui/material';

import {
  SetupCard,
  SetupCardHeader,
  SetupCardTask,
  SetupCardFooter,
} from '..';
import * as SetupCardHeaderStories from '../setup-card-header/setup-card-header.stories';
import * as SetupCardTaskStories from '../setup-card-task/setup-card-task.stories';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCard',
  component: SetupCard,
} as ComponentMeta<typeof SetupCard>;

const Template: ComponentStory<typeof SetupCard> = (args) => (
  <SetupCard {...args}>
    <SetupCardHeader {...SetupCardHeaderStories.Header.args} />
    <CardContent>
      <SetupCardTask {...SetupCardTaskStories.Task.args} />
      <SetupCardTask {...SetupCardTaskStories.Action.args} />
    </CardContent>
    <SetupCardFooter>
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item>
          <Typography fontWeight={600}>Footer Message?</Typography>
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

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Card = Template.bind({});
Card.args = {};
