import { createTheme } from '@mui/material';

const { typography: { pxToRem: muiPxToRem } } = createTheme();

export const pxToRem = muiPxToRem;
