import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Radio } from '@mui/material';
import FormControlLabel from '../form-control-label';
import { RadioButtonGroup } from '..';

export default {
  title: 'Input/RadioButtonGroup',
  component: RadioButtonGroup,
} as ComponentMeta<typeof RadioButtonGroup>;

export const RadioButtonGroupBase = () => {
  const [value, setValue] = React.useState<string>('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <RadioButtonGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name="radio-buttons-group"
      onChange={handleChange}
      value={value}
    >
      <FormControlLabel key="1" value="Item 1" control={<Radio />} label="female">Female</FormControlLabel>
      <FormControlLabel key="2" value="Item 2" control={<Radio />} label="male">Male</FormControlLabel>
      <FormControlLabel key="3" value="Item 3" control={<Radio />} label="other">Other</FormControlLabel>
    </RadioButtonGroup>
  );
};
