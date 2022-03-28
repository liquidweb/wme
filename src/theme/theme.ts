import { createTheme } from "@mui/material";
import { pxToRem } from '../utils';

declare module '@mui/material/styles' {

	interface PaletteOptions {
		sidebar?: TypeSidebar;
		todo?: TypeStatus;
		completed?: TypeStatus;
	}

	interface PaletteColor {
		grey?: string;
		white?: string;
	}

	interface SimplePaletteColorOptions {
		darker?: string;
		grey?: string;
		white?: string;
	}

	interface TypeText {
		white?: string;
		heading?: string;
	}

	interface TypeSidebar {
		text?: string;
		background?: string;
	}

	interface TypeStatus {
		main?: string;
		background?: string;
	}
}
  

export const theme = createTheme({
	palette: {
		primary: {
			main: '#303F9F',
			dark: '#2A3353',
			grey: '#949494',
			white: '#FFF',
		},
		text: {
			primary: '#2A3353',
			secondary: '#2A3353',
			disabled: '#757575',
			white: '#FFFFFF',
			heading: '#293254',
		},
		sidebar: {
			text: '#252D48',
			background: '#FAFAFA',
		},
		todo: {
			main: '#0071BC',
			background: '#E9F5FE',
		},
		completed: {
			main: '#204522',
			background: '#EDF7ED',
		},
		error: {
			main: '#FF0000',
			dark: '#AA0000',
			light: '#FF9492',
		},
		warning: {
			main: '#EC6C20',
			dark: '#AA0000',
			light: '#FF9492',
		},
		success: {
			main: '#4FB669',
			dark: '#11772A',
			light: '#EDF7ED',
		},
		info: {
			main: '#158ACE',
			dark: '#085796',
			light: '#E9F5FE',
		},
	},
	typography: {
		allVariants: {
			color: '#2A3353',
		},
		fontFamily: 'sans-serif',
		h1: {
			fontSize: pxToRem(32),
			fontWeight: 400,
			letterSpacing: '-0.05em',
		},
		h2: {
			letterSpacing: '-0.03em',
		},
		h3: {
			fontSize: pxToRem(24),
			fontWeight: 400,
			letterSpacing: '-0.03em',
		},
		h4: {
			fontSize: pxToRem(16),
			fontWeight: 600,
		},
		subtitle1: {
			fontSize: pxToRem(18),
			fontWeight: 400,
			letterSpacing: '-0.01em',
		},
		body1: {
			fontSize: '1rem',
			letterSpacing: '-0.01em',
		},
		body2: {
			fontSize: pxToRem(14),
			letterSpacing: '-0.01em',
		},
		overline: {
			display: 'inline-block',
			textTransform: 'none',
		},
	},
});
