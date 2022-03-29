import { ThemeProvider } from '@mui/system';
import React from 'react';
// import { ThemeProvider } from '@storybook/theming';
import { theme } from '../src/theme';

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}

export const decorators = [
  Story => (
    <ThemeProvider theme={ theme }>
      <Story />
    </ThemeProvider>
  ),
];
