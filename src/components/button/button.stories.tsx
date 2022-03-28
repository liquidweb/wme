import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';

import { Button } from '../';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Components/Button',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
	  color: {
	    options: ['primary', 'secondary', 'inherit'],
	    control: 'radio',
	  },
		startIcon: {
			control: false,
			mapping: {
				true: <DownhillSkiingIcon />
			}
		},
		endIcon: {
			control: 'boolean',
			mapping: {
				true: <DownhillSkiingIcon />
			}
		},		
	},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const commonArgs = {
    children: 'Button',
	disabled: false,
}

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
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoContainer.args = {
    ...commonArgs,
    variant: 'text',
};
