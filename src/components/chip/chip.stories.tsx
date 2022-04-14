import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckCircleOutline, AccessTime } from '@mui/icons-material';
import { Chip } from '..';

export default {
  title: 'Data Display/Chip',
  component: Chip,
  argTypes: {
    color: {
      options: ['success', 'info'],
      control: 'radio',
    },
    size: {
      defaultValue: 'small',
      options: ['small', 'large'],
      control: 'radio',
    },
  },
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => (
  <Chip {...args} />
);

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
