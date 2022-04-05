import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

export function WMEProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
