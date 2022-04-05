import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { TextField } from '..';
// import { IconButton } from '@mui/material';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Input/TextField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: 'An input field can include a label, text field users can type into, and helper text.',
      },
    },
  },
  argTypes: {
    endAdornment: {
      control: 'boolean',
      mapping: {
        true:
          // eslint-disable-next-line react/jsx-indent
          <InputAdornment position="end">
            <AccountCircle />
          </InputAdornment>,
      },
    },
  },
} as ComponentMeta<typeof TextField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextField> = (args) => <TextField {...args} />;

const commonArgs = {
  label: 'Input Field Title',
  helperText: 'Helper text lorem ipsum',
};

export const TextFieldBase = Template.bind({});
TextFieldBase.args = {
  ...commonArgs,
  placeholder: 'Weep; for not all tears are an evil.',
};

export const TextFieldFilled = Template.bind({});
TextFieldFilled.args = {
  ...commonArgs,
  defaultValue: 'Weep; for not all tears are an evil.',
};

export const TextFieldError = Template.bind({});
TextFieldError.args = {
  ...commonArgs,
  error: true,
  defaultValue: 'Weep; for not all tears are an evil.',
};

export const TextFieldDisabled = Template.bind({});
TextFieldDisabled.args = {
  ...commonArgs,
  disabled: true,
  defaultValue: 'Weep; for not all tears are an evil.',
};
