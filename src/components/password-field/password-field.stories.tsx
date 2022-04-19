import React, { useState, ChangeEvent } from 'react';
import { ComponentMeta } from '@storybook/react';
import { PasswordField } from '..';

export default {
  title: 'Input/Password',
  component: PasswordField,
  parameters: {
    docs: {
      description: {
        component: 'Password fields show strength of password, and have the option to reveal the password to the user by selecting the icon within the input field.',
      },
    },
  },
  argTypes: {
    color: {
      control: {
        type: 'radio',
        options: [
          'error', 'warning', 'success',
        ],
        defaultValue: 'error',
      },
    },
  },
} as ComponentMeta<typeof PasswordField>;

export const PasswordFieldBase = (args: any) => {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSetPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <PasswordField
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={handleSetPassword}
      onClick={handleClickShowPassword}
      onMouseDown={handleMouseDownPassword}
      {...args}
    />
  );
};

PasswordFieldBase.args = {
  label: 'Your Password',
  helperText: 'Helper text lorem ipsum',
  chipLabel: 'Weak',
  color: 'error',
  placeholder: 'i.e. Mellon',
};
