import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Grid, Link, Typography } from '@mui/material';

import { SetupCardFooter } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCardFooter',
  component: SetupCardFooter,
} as ComponentMeta<typeof SetupCardFooter>;

const Template: ComponentStory<typeof SetupCardFooter> = () => (
  <SetupCardFooter>
    <Grid container sx={{ alignItems: 'center' }}>
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

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Footer = Template.bind({});
Footer.args = {
  title: 'Example footer question?',
};
