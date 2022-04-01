import { createTheme } from '@mui/material/styles';
import { pxToRem } from '../utils';

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface Theme {

  }

  // eslint-disable-next-line no-unused-vars
  interface TypeText {
    white?: string;
    placeholder?: string;
    link?: string;
  }

  interface TypeBorder {
    ui?: string;
    layout?: string;
    dark?: string;
  }

  // eslint-disable-next-line no-unused-vars
  interface PaletteOptions {
    border?: TypeBorder;
  }

  // eslint-disable-next-line no-unused-vars
  interface Palette {
    border: TypeBorder;
  }

  // eslint-disable-next-line no-unused-vars
  interface TypeBackground {
    primary?: string;
    secondary?: string;
    hover?: string;
    dark?: string;
    grey?: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0047FF',
      dark: '#0033B8',
      light: '#7A9FFF',
    },
    secondary: {
      main: '#A91CFF',
      dark: '#6E08AD',
      light: '#D99CFF',
    },
    success: {
      main: '#4FB669',
      dark: '#11772A',
      light: '#EDF7ED',
    },
    text: {
      primary: '#000000',
      secondary: '#4E4E4E',
      disabled: '#757575',
      white: '#FFFFFF',
      placeholder: '#757575',
      link: '#0047FF',
    },
    border: {
      ui: '#C4C4C4',
      layout: '#C4C4C4',
      dark: '#000000',
    },
    error: {
      main: '#FF0000',
      dark: '#AA0000',
      light: '#FF9492',
    },
    warning: {
      main: '#EC6C20',
      dark: '#E3521B',
      light: '#FD9826',
    },
    info: {
      main: '#158ACE',
      dark: '#085796',
      light: '#E9F5FE',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#FAFAFA',
      hover: '#F5F5F5',
      dark: '#2A3353',
      grey: '#F5F5F5',
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
