import React from 'react';
import { ComponentMeta } from '@storybook/react';
import {
  Visibility,
  Abc,
  School,
  LibraryAdd,
} from '@mui/icons-material';
import { SetupCardList, SetupCardListItem } from '..';

export default {
  title: 'Setup Cards/SetupCardList',
  component: SetupCardList,
} as ComponentMeta<typeof SetupCardList>;

export const ListWithIcons = () => (
  <SetupCardList>
    <SetupCardListItem title="Testing with icon title" icon={<Visibility />} />
    <SetupCardListItem title="Testing with icon title" icon={<Abc />} />
    <SetupCardListItem title="Testing with icon title" icon={<LibraryAdd />} />
    <SetupCardListItem title="Testing with icon title" icon={<School />} />
  </SetupCardList>
);

export const ListWithIconsAndLinks = () => (
  <SetupCardList>
    <SetupCardListItem title="Testing with icon title" href="#testing-link" icon={<Visibility />} />
    <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<Abc />} />
    <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<LibraryAdd />} />
    <SetupCardListItem title="Testing with icon title" href="#test-two" icon={<School />} />
  </SetupCardList>
);

export const ListWithLinks = () => (
  <SetupCardList>
    <SetupCardListItem title="Testing with icon title" href="#testing-link" />
    <SetupCardListItem title="Testing with icon title" href="#test-two" />
    <SetupCardListItem title="Testing with icon title" href="#test-two" />
    <SetupCardListItem title="Testing with icon title" href="#test-two" />
  </SetupCardList>
);

export const List = () => (
  <SetupCardList>
    <SetupCardListItem title="Testing with icon title" />
    <SetupCardListItem title="Testing with icon title" />
    <SetupCardListItem title="Testing with icon title" />
    <SetupCardListItem title="Testing with icon title" />
  </SetupCardList>
);
