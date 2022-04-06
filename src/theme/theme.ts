/* eslint-disable no-unused-vars */
import React from 'react';
import { createTheme } from '@mui/material/styles';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createPalette' {
  interface TypographyStyleOptionsExtended extends TypographyStyleOptions {
    pxToRem: (px: number) => number;
  }
  interface Theme {
    typography: TypographyStyleOptionsExtended;
  }

  interface TypeText {
    white?: string;
    placeholder?: string;
    link?: string;
  }

  interface TypeBorder {
    ui?: string;
    layout?: string;
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
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body: React.CSSProperties;
    subtext: React.CSSProperties;
    link: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body?: React.CSSProperties;
    subtext?: React.CSSProperties;
    link?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body: true;
    subtext: true;
    link: true;
    // Remove unused variants
    body1: false;
    body2: false;
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
    lineHeight: 58 / 48,
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
    lineHeight: 28 / 24,
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
  body: {
    fontSize: '0.875rem',
    lineHeight: 1.285,
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
    fontWeight: 500,
    letterSpacing: '0%',
  },

};

export type WMEVariants = keyof typeof typographyVariants;

export const themeWME = {
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily,
      },
    },
  },
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
    fontFamily,
    allVariants: {
      color: '#000000',
    },
    ...typographyVariants,
  },
};

export const theme = createTheme(themeWME);
