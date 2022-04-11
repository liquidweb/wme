import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SetupCardHeader, SetupCardChip } from '..';

import * as SetupCardChipStories from '../setup-card-chip/setup-card-chip.stories';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCardHeader',
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

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Header = Template.bind({});
Header.args = {
  title: 'Example Card Header',
  subheader: 'Donec ullamcorper nulla non metus auctor fringilla.',
  action: <SetupCardChip {...SetupCardChipStories.Todo.args} />,
};
