import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import { SetupCardList, SetupCardListItem } from '..';

export default {
  title: 'Setup Cards/SetupCardListItem',
  component: SetupCardListItem,
  argTypes: {
    icon: {
      control: 'boolean',
      mapping: {
        true: <DownhillSkiingIcon />,
      },
    },
  },
} as ComponentMeta<typeof SetupCardListItem>;

const Template: ComponentStory<typeof SetupCardListItem> = (args) => (
  <SetupCardList>
    <SetupCardListItem {...args} />
  </SetupCardList>
);

export const ListItem = Template.bind({});
ListItem.args = {
  title: 'Example title text for testing',
  href: '#example-link',
  target: '_self',
};
