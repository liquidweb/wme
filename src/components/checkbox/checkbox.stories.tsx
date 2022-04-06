import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from '..';

export default {
  title: 'Input/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Base = Template.bind({});

Base.args = {
  label: 'Creating an account means you’re okay with our Terms of Service and Privacy Policy.',
};
