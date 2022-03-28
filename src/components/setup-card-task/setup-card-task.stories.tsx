import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SetupCardTask } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCardTask',
  component: SetupCardTask,
} as ComponentMeta<typeof SetupCardTask>;

const Template: ComponentStory<typeof SetupCardTask> = (args) => (
  <SetupCardTask {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Task = Template.bind({});
Task.args = {
  title: 'Example task title',
  intro: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
  variant: 'task',
  avatarProps: {},
};

export const Action = Template.bind({});
Action.args = {
  ...Task.args,
  title: 'Example task with Action',
  variant: 'action',
  button: {
    label: 'Connect Stripe',
    url: '#TBD',
    backgroundColor: '#645FF3',
  },
};
