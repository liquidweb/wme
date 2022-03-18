import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'WME Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const commonArgs = {
    children: 'Button',
}

export const Text = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Text.args = {
    ...commonArgs,
    variant: 'text',
};

export const Contained = Template.bind({});
Contained.args = {
    ...commonArgs,
    variant: 'contained',
};

export const Outlined = Template.bind({});
Outlined.args = {
    ...commonArgs,
    variant: 'outlined',
};
