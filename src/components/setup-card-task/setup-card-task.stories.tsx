import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SetupCardTask } from '..';

// @ts-ignore
import TaskIcon from './img/task-icon.png';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCardTask',
  component: SetupCardTask,
  decorators: [(story) => <div style={{ maxWidth: 800, margin: '0 auto' }}>{story()}</div>],
  argTypes: {
    variant: {
      options: ['task', 'action'],
      control: 'radio',
    },
  },
} as ComponentMeta<typeof SetupCardTask>;

const Template: ComponentStory<typeof SetupCardTask> = (args) => (
  <SetupCardTask {...args} />
);

const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  // eslint-disable-next-line no-console
  console.log(event);
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Task = Template.bind({});
Task.args = {
  title: 'Example task title',
  intro: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
  variant: 'task',
  taskCta: 'Learn More',
  onClick: (e: React.MouseEvent<HTMLElement>) => handleClick(e),
  avatarProps: {
    src: TaskIcon,
  },
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
    onClick: (e) => handleClick(e),
  },
};
