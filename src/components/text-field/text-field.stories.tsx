import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextField } from '..';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Inputs/TextField',
  component: TextField,
} as ComponentMeta<typeof TextField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

export const InputBase = Template.bind({});
InputBase.args = {
  variant: 'outlined',
};

export const InputFocus = Template.bind({});
InputFocus.args = {
  variant: 'outlined',
};

export const InputFilled = Template.bind({});
InputFilled.args = {
  variant: 'outlined',
};

export const InputError = Template.bind({});
InputError.args = {
  variant: 'outlined',
};
