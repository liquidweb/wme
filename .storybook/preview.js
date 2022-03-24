import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { ThemeProvider as Emotion10ThemeProvider } from '@storybook/theming';
import { THEME } from '../src/theme';

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}

const theme = createTheme(THEME);

export const decorators = [
	Story => (
		<Emotion10ThemeProvider theme={theme}>
			<ThemeProvider theme={theme}>
				<Story />
			</ThemeProvider>
		</Emotion10ThemeProvider>
	),
];
