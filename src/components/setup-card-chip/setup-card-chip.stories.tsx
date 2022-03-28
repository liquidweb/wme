import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckCircleOutline, AccessTime } from '@mui/icons-material';

import { SetupCardChip } from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SetupCardChip',
  component: SetupCardChip,
} as ComponentMeta<typeof SetupCardChip>;

const Template: ComponentStory<typeof SetupCardChip> = (args) => (
  <SetupCardChip {...args} />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Todo = Template.bind({});
Todo.args = {
  label: '5 mins',
  color: 'info',
  size: 'small',
  icon: <AccessTime />,
};

export const Complete = Template.bind({});
Complete.args = {
  ...Todo.args,
  label: 'Completed',
  color: 'success',
  icon: <CheckCircleOutline />,
};
