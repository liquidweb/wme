import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SetupCardHeader, Chip } from '..';
import * as ChipStories from '../chip/chip.stories';

export default {
  title: 'Setup Cards/SetupCardHeader',
  component: SetupCardHeader,
  decorators: [(story) => <div style={{ maxWidth: 800, margin: '0 auto' }}>{story()}</div>],
  parameters: {
    docs: {
      description: {
        component: 'The Wizard header features the logo and the ability to exit.',
      },
    },
  },
  argTypes: {
    title: {
      type: 'string',
      description: '`node` The content of the component.',
    },
    subheader: {
      description: '`node` The content of the component.',
    },
    action: {
      control: false,
      description: '`node` The action to display in the card header.',
    },
  },
} as ComponentMeta<typeof SetupCardHeader>;

const Template: ComponentStory<typeof SetupCardHeader> = (args) => (
  <SetupCardHeader {...args} />
);

export const Header = Template.bind({});
Header.args = {
  title: 'Example Card Header',
  subheader: 'Donec ullamcorper nulla non metus auctor fringilla.',
  action: <Chip {...ChipStories.Todo.args} />,
};
