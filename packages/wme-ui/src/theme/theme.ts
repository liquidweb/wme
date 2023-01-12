/* eslint-disable no-unused-vars */
import type React from 'react';
import { createTheme } from '@mui/material/styles';
import type { TypographyStyleOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createPalette' {
  interface TypographyStyleOptionsExtended extends TypographyStyleOptions {
    pxToRem: (px: number) => number;
  }
  interface Theme {
    typography: TypographyStyleOptionsExtended;
  }

  interface ThemeOptions {
    globalStyles?: {
      menuListItemHeight?: number,
    }
  }

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

  interface PaletteOptions {
    border?: TypeBorder;
  }

  interface Palette {
    border: TypeBorder;
  }

  interface TypeBackground {
    primary?: string;
    secondary?: string;
    hover?: string;
    dark?: string;
    grey?: string;
    disabled?: string;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    subtext: React.CSSProperties;
    link: React.CSSProperties;
    taskTitle: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    subtext?: React.CSSProperties;
    link?: React.CSSProperties;
    taskTitle?: React.CSSProperties;
  }

  interface Theme {
    globalStyles: {
      menuListItemHeight: number;
      menuListItemPadding: number;
      menuPaperWidth: number;
    };
  }

  interface ThemeOptions {
    globalStyles?: {
      menuListItemHeight?: number;
      menuListItemPadding?: number;
      menuPaperWidth?: number;
    };
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtext: true;
    link: true;
    taskTitle: true;
    // Remove unused variants
    subtitle1: false;
    subtitle2: false;
  }
}

const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Arial',
  'sans-serif',
].join(',');

const typographyVariants = {
  h1: {
    fontSize: '3rem',
    lineHeight: 1.20833,
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  h2: {
    fontSize: '2rem',
    lineHeight: 1.25,
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  h3: {
    fontSize: '1.5rem',
    lineHeight: 1.16667,
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  h4: {
    fontSize: '1.125rem',
    lineHeight: 1.33,
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  h5: {
    fontSize: '0.875rem',
    lineHeight: 1.285,
    fontWeight: 600,
    letterSpacing: '-2%',
  },
  body1: {
    fontSize: '0.875rem',
    lineHeight: 1.285,
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  body2: {
    fontSize: '0.75rem',
    lineHeight: 1.333,
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  subtext: {
    fontSize: '0.625rem',
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: '0%',
  },
  link: {
    fontSize: '0.875rem',
    lineHeight: 1.71,
    fontWeight: 400,
    letterSpacing: '0%',
  },
  taskTitle: {
    fontSize: '1rem',
    lineHeight: 1.19,
    fontWeight: 600,
    letterSpacing: '-3%',
  },
};

export type WMEVariants = keyof typeof typographyVariants;

let themeWME = createTheme({
  palette: {
    primary: {
      main: '#7000FF',
      dark: '#5A00CD',
      light: '#9A76F3',
    },
    secondary: {
      main: '#000000',
      dark: '#2A222F',
      light: '#605666',
    },
    success: {
      main: '#1B8F6D',
      dark: '#0F5741',
      light: '#BFE3BE',
    },
    text: {
      primary: '#000000',
      secondary: '#4E4E4E',
      disabled: '#757575',
      white: '#FFFFFF',
      placeholder: '#757575',
      link: '#0500FF',
    },
    border: {
      ui: '#DFDFDF',
      layout: '#C4C4C4',
      dark: '#000000',
    },
    error: {
      main: '#DF3416',
      dark: '#AA0000',
      light: '#FF9492',
    },
    warning: {
      main: '#EC563D',
      dark: '#B53200',
      light: '#FFDACA',
    },
    info: {
      main: '#0500FF',
      dark: '#020129',
      light: '#ADD7FA',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#FAFAFA',
      hover: '#F5F5F5',
      dark: '#000000',
      grey: '#F5F5F5',
      disabled: '#F0F1F9',
    },
  },
  typography: {
    fontFamily,
    allVariants: {
      color: '#000000',
    },
    ...typographyVariants,
  },
  globalStyles: {
    menuListItemHeight: 40,
    menuListItemPadding: 24,
    menuPaperWidth: 415,
  },
});

themeWME = createTheme(themeWME, {
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily,
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: themeWME.palette.background.dark,
          padding: themeWME.spacing(1),
          '& .MuiTooltip-arrow': {
            color: themeWME.palette.background.dark,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: themeWME.palette.text.link,
          textDecorationColor: themeWME.palette.text.link,
        },
      },
    },
  },
});

export const theme = themeWME;
