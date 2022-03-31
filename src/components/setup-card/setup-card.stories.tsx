import React from 'react';
import { ComponentMeta } from '@storybook/react';
import {
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

import { SetupCard, SetupCardHeader, SetupCardTask } from '..';
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
      <Grid container>
        <Grid item xs={4}>
          <Typography fontWeight={600}>Column One</Typography>
          <List dense>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight={600}>Column Two</Typography>
          <List dense>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight={600}>Column Three</Typography>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="List item text" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </CardContent>
  </SetupCard>
);
