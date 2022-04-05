import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { SelectChangeEvent } from '@mui/material';
import WmeMenuItem from '../menu-item';

import { Dropdown } from '..';

export default {
  title: 'Input/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component: 'Dropdown presents a list of options for a user to select from, sometimes several.',
      },
    },
  },
} as ComponentMeta<typeof Dropdown>;

export const DropdownBase = () => {
  const [item, setItem] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof item>) => {
    const {
      target: { value },
    } = event;
    setItem(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Dropdown
      value={item}
      selectValue="Select"
      onChange={handleChange}
    >
      <WmeMenuItem id="item1" key="1" value="Item 1">Item 1</WmeMenuItem>
      <WmeMenuItem id="item2" key="2" value="Item 2">Item 2</WmeMenuItem>
      <WmeMenuItem id="item3" key="3" value="Item 3">Item 3</WmeMenuItem>
    </Dropdown>
  );
};
