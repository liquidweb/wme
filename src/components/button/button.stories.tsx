import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import { action } from '@storybook/addon-actions';

import { Button } from '..';

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit'],
    },
    startIcon: {
      control: 'boolean',
      mapping: {
        true: <DownhillSkiingIcon />,
      },
      defaultValue: false,
    },
    endIcon: {
      control: 'boolean',
      mapping: {
        true: <DownhillSkiingIcon />,
      },
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button onClick={action('button clicked')} {...args} />;

const commonArgs = {
  children: 'Button',
  disabled: false,
};

export const Primary = Template.bind({});
Primary.args = {
  ...commonArgs,
  variant: 'contained',
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...commonArgs,
  variant: 'contained',
  color: 'secondary',
};

export const Stroked = Template.bind({});
Stroked.args = {
  ...commonArgs,
  variant: 'outlined',
  color: 'primary',
};

export const NoContainer = Template.bind({});
NoContainer.args = {
  ...commonArgs,
  variant: 'text',
  color: 'inherit',
};
