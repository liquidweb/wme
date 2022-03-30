import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ToggleButton from '@mui/material/ToggleButton';
import { ToggleButtonGroup } from '..';

export default {
  title: 'Buttons/ToggleButtonGroup',
  component: ToggleButtonGroup,
  argTypes: {
    numbuttons: {
      control: {
        type: 'number',
        min: 1,
        max: 4,
        default: 2,
      },
    },
  },
} as ComponentMeta<typeof ToggleButtonGroup>;

const Template: ComponentStory<typeof ToggleButtonGroup> = (args) => {
  const [selected, setSelected] = useState<string | null>('');
  const buttonsArr = [];
  const { children, numbuttons } = args;

  const handleSelected = (
    event: React.MouseEvent<HTMLElement>,
    newSelected: string | null,
  ) => {
    setSelected(newSelected);
  };

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numbuttons; i++) {
    buttonsArr.push(<ToggleButton value={`option${i}`} key={i}>{children}</ToggleButton>);
  }

  return (
    <ToggleButtonGroup
      value={selected}
      onChange={handleSelected}
      exclusive
      aria-label="toggle button group"
      numbuttons={numbuttons}
    >
      { buttonsArr.map((button) => button) }
    </ToggleButtonGroup>
  );
};

export const ButtonsGroup = Template.bind({});
ButtonsGroup.args = {
  children: 'Option',
};
