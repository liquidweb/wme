import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProgressBar } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'],
      control: 'select',
    },
    variant: {
      options: ['determinate', 'indeterminate', 'buffer', 'query'],
      control: 'select',
    },
  }
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Progress = Template.bind({});
Progress.args = {
  value: 50,
  variant: 'determinate',
  color: 'primary',
  statusMessage: 'Importing your colors...',
};

export const ProgressComplete = Template.bind({});

ProgressComplete.args = {
  value: 100,
  color: 'success',
  statusMessage: 'Success!',
};
