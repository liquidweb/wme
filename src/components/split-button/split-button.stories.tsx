import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SplitButton from './split-button';

export default {
  title: 'Buttons/SplitButton',
  component: SplitButton,
} as ComponentMeta<typeof SplitButton>;

const Template: ComponentStory<typeof SplitButton> = (args:any) => (
  <SplitButton
    handleClick={action('button-click')}
    {...args}
  />
);

const commonArgs = {
  options: ['Create a merge commit', 'Squash and merge', 'Rebase and merge'],
  ariaLabelGroup: 'split button example',
  disabled: false,
};

export const Primary = Template.bind({});
Primary.args = {
  ...commonArgs,
  color: 'primary',
};

Primary.parameters = { controls: { include: ['disabled', 'options'] } };

export const Secondary = Template.bind({});
Secondary.args = {
  ...commonArgs,
  color: 'secondary',
};

Secondary.parameters = { controls: { include: ['disabled', 'options'] } };
