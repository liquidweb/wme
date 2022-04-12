import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SplitButton from './split-button';

export default {
  title: 'Buttons/SplitButton',
  component: SplitButton,
} as ComponentMeta<typeof SplitButton>;

const Template: ComponentStory<typeof SplitButton> = (args:any) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { options } = args;

  const handleIndexChange = (index:number) => {
    setSelectedIndex(index);
  };

  return (
    <SplitButton
      selectedIndex={selectedIndex}
      handleIndexChange={handleIndexChange}
      handleClick={action(`${options[selectedIndex]} was clicked`)}
      {...args}
    />
  );
};

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
