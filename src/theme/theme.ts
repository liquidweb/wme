/* eslint-disable no-unused-vars */
import React from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { TypographyOptions, TypographyStyleOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface TypographyStyleOptionsExtended extends TypographyStyleOptions {
    pxToRem: (px: number) => number;
  }
  interface Theme {
    typography: TypographyStyleOptionsExtended;
  }

  interface Palette {

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

const typography: TypographyOptions = {
  fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
  allVariants: {
    color: '#2A3353',
  },
  h1: {
    fontSize: '3rem', // 48px
    // lineHeight: '3.625rem', // 58px
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  h2: {
    fontSize: '2rem', // 32px
    // lineHeight: '2.5rem', // 58px
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  h3: {
    fontSize: '1.5rem', // 24px
    // lineHeight: '1.75rem', // 28px
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  h4: {
    fontSize: '1.125rem', // 18px
    // lineHeight: '1.5rem', // 24px
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  h5: {
    fontSize: '0.875rem', // 14px
    // lineHeight: '1.125rem', // 18px
    fontWeight: 600,
    letterSpacing: '-2%',
  },
  body: {
    fontSize: '0.875rem', // 14px
    // lineHeight: '1.125rem', // 18px
    fontWeight: 400,
    letterSpacing: '-2%',
  },
  subtext: {
    fontSize: '0.625rem', // 10px
    // lineHeight: '1rem', // 16px
    fontWeight: 400,
    letterSpacing: '0%',
  },
  link: {
    fontSize: '0.875rem', // 14px
    // lineHeight: '1.5rem', // 24px
    fontWeight: 400,
    letterSpacing: '0%',
  },

};

export type WMEVariants = keyof TypographyOptions | 'inherit';

export const theme = responsiveFontSizes(createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: 'sans-serif',
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
  typography,
}));
