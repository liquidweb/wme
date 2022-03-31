import React from 'react';
import { ComponentMeta } from '@storybook/react';
import {
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

import { SetupCardList } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCardList',
  component: SetupCardList,
} as ComponentMeta<typeof SetupCardList>;

export const ListWithIcons = () => (
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

export const ListWithIconsAndLinks = () => (
  <SetupCardList>
    <ListItem>
      <ListItemIcon>
        <Visibility />
      </ListItemIcon>
      <ListItemText>
        <Link href="#test">
          List item text
        </Link>
      </ListItemText>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <Visibility />
      </ListItemIcon>
      <ListItemText>
        <Link href="#test">
          List item text
        </Link>
      </ListItemText>
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <Visibility />
      </ListItemIcon>
      <ListItemText>
        <Link href="#test">
          List item text
        </Link>
      </ListItemText>
    </ListItem>
  </SetupCardList>
);

export const ListWithLinks = () => (
  <SetupCardList>
    <ListItem>
      <ListItemText>
        <Link href="#test">
          List item text
        </Link>
      </ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>
        <Link href="#test">
          List item text
        </Link>
      </ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>
        <Link href="#test">
          List item text
        </Link>
      </ListItemText>
    </ListItem>
  </SetupCardList>
);

export const List = () => (
  <SetupCardList>
    <ListItem>
      <ListItemText>
        List item text
      </ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>
        List item text
      </ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>
        List item text
      </ListItemText>
    </ListItem>
  </SetupCardList>
);
