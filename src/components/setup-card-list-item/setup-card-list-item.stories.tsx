import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';

import { SetupCardList, SetupCardListItem } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCardListItem',
  component: SetupCardListItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    icon: {
      control: 'boolean',
      mapping: {
        true: <DownhillSkiingIcon />,
      },
    },
  },
} as ComponentMeta<typeof SetupCardListItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
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
