import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SplitButton from './split-button';

export default {
  title: 'Buttons/SplitButton',
  component: SplitButton,
} as ComponentMeta<typeof SplitButton>;

const Template: ComponentStory<typeof SplitButton> = (args:any) => {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    console.log('clicked');
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current
      && anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <SplitButton
      handleClick={handleClick}
      selectedIndex={selectedIndex}
      handleMenuItemClick={handleMenuItemClick}
      handleToggle={handleToggle}
      handleClose={handleClose}
      open={open}
      anchorRef={anchorRef}
      {...args}
    />
  );
};

export const SplitButtonDefault = Template.bind({});
SplitButtonDefault.args = {
  options: ['Create a merge commit', 'Squash and merge', 'Rebase and merge'],
  ariaLabel: 'split button example',
};
