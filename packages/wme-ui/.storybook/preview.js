import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../src/theme";

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	options: {
		storySort: {
			order: [
				"Documentation",
				"Foundation",
				"Buttons",
				"Data Display",
				"Input",
				"Navigation",
				"Setup Cards",
				"Setup Card v2",
			],
		},
	},
};

export const decorators = [
	(Story) => (
		<ThemeProvider theme={theme}>
			<Story />
		</ThemeProvider>
	),
];
