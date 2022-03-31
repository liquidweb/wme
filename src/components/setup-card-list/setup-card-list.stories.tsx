import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Visibility } from '@mui/icons-material';

import { SetupCardList } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCardList',
  component: SetupCardList,
} as ComponentMeta<typeof SetupCardList>;

export const Columns = () => (
  <SetupCardList>
    <ListItem>
      <ListItemIcon>
        <Visibility />
      </ListItemIcon>
      <ListItemText>
        List item text
      </ListItemText>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <Visibility />
      </ListItemIcon>
      <ListItemText>
        List item text
      </ListItemText>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <Visibility />
      </ListItemIcon>
      <ListItemText>
        List item text
      </ListItemText>
    </ListItem>
  </SetupCardList>
);
