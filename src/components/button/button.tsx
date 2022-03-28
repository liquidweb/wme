import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {

}

const BUTTON_SX = {

};

export default function Button(props: ButtonProps) {
  const { sx = {}, ...rest } = props;
  return <MuiButton color="primary" sx={{ ...BUTTON_SX, ...sx }} {...rest} />;
}
