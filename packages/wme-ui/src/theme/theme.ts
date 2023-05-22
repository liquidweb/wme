/* eslint-disable no-unused-vars */
import type React from 'react';
import { createTheme } from '@mui/material/styles';
import type { TypographyStyleOptions } from '@mui/material/styles/createTypography';
import { pxToRem } from '../utils';

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
    MuiModal: {
      styleOverrides: {
        root: {
          /* Wizard Header */
          '& .WmeExitButton-root .WmeButton-root': {
            color: themeWME.palette.text.disabled,
          },
          '& .WmeCardSelectItem-icon': {
            backgroundColor: 'transparent',
            height: '56px',
            width: '56px',
            borderRadius: 0,

            '& img, & svg': {
              width: 'auto',
              height: '100%',
            },
          },
          '& .WmeCardSelectItem-root.MuiToggleButtonGroup-groupedVertical .WmeCardSelectItem-icon': {
            marginBottom: 0,
          },
          '& .WmeWizardFooter-next': {
            '& .WmeWizardFooterNextButton': {
              transition: 'all ease .3s',
              '& .MuiButton-endIcon': {
                position: 'absolute',
                transition: 'all ease .3s',
                opacity: 0,
                right: '16px',
              },
              '&:hover, &:active': {
                transition: 'all ease .3s',
                paddingRight: '32px',
                '& .MuiButton-endIcon': {
                  opacity: 1,
                },
              },
            },
          },
          /* MenuItem */
          '& .WmeMenuItem-root .WmeMenuItem-icon .MuiSvgIcon-root': {
            fill: themeWME.palette.success.dark,
          },
          '& .WmeCardSelectItem-contentInner h4': {
            fontSize: pxToRem(18),
            fontWeight: 500,
            lineHeight: 1.333,
            letterSpacing: '-0.02em',
          },
          '& .WmeCardSelectItem-completeContainer > div': {
            backgroundColor: themeWME.palette.success.light,

            '& .MuiSvgIcon-root': {
              color: themeWME.palette.success.dark,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            padding: '4px 12px',
            border: 'none',

            '& ~ .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
            },

            '&:focus, &:focus-visible': {
              outline: 'none',
              boxShadow: 'none',
            },

            '&:focus ~ .MuiOutlinedInput-notchedOutline, &:focus-visible ~ .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.dark',
            },

            '&.Mui-disabled': {
              backgroundColor: 'transparent',
              borderColor: 'transparent',

              '& ~ .MuiOutlinedInput-notchedOutline': {
                backgroundColor: 'rgba(63, 81, 181, 0.08)',
                borderColor: 'transparent',
              },
            },
          },
          '& ~ .MuiFormHelperText-root.Mui-error': {
            position: 'absolute',
            top: '-25px',
            right: 0,
            marginTop: 0,
          },
          '& .MuiSelect-icon': {
            backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDE2IDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjgwMDE2IDAuMDAzMjcyODRDMS45MDU0IDAuMDAyNjY0NCAyLjAwOTcyIDAuMDIyODM0NCAyLjEwNzE0IDAuMDYyNjI3MUMyLjIwNDU2IDAuMTAyNDIgMi4yOTMxNyAwLjE2MTA1MyAyLjM2Nzg5IDAuMjM1MTYzTDguMTk3MTEgNi4wNzIzN0wxNC4wMjYzIDAuMjM1MTYyQzE0LjE3NjkgMC4wODQ1OTA3IDE0LjM4MTEgMi44OTEyZS0wNyAxNC41OTQxIDIuNzA1MDVlLTA3QzE0LjgwNyAyLjUxODg5ZS0wNyAxNS4wMTEyIDAuMDg0NTkwNiAxNS4xNjE4IDAuMjM1MTYyQzE1LjMxMjQgMC4zODU3MzMgMTUuMzk2OSAwLjU4OTk1IDE1LjM5NjkgMC44MDI4OUMxNS4zOTY5IDEuMDE1ODMgMTUuMzEyNCAxLjIyMDA1IDE1LjE2MTggMS4zNzA2Mkw4Ljc2NDg0IDcuNzY3NTZDOC42OTA1IDcuODQyNTEgOC42MDIwNiA3LjkwMiA4LjUwNDYyIDcuOTQyNTlDOC40MDcxOCA3Ljk4MzE5IDguMzAyNjcgOC4wMDQwOSA4LjE5NzExIDguMDA0MDlDOC4wOTE1NSA4LjAwNDA5IDcuOTg3MDMgNy45ODMxOSA3Ljg4OTU5IDcuOTQyNTlDNy43OTIxNSA3LjkwMiA3LjcwMzcxIDcuODQyNTEgNy42MjkzOCA3Ljc2NzU2TDEuMjMyNDMgMS4zNzA2MkMxLjE1NzQ5IDEuMjk2MjggMS4wOTggMS4yMDc4NSAxLjA1NzQgMS4xMTA0MUMxLjAxNjgxIDEuMDEyOTYgMC45OTU5MDYgMC45MDg0NSAwLjk5NTkwNiAwLjgwMjg5MUMwLjk5NTkwNiAwLjY5NzMzMiAxLjAxNjgxIDAuNTkyODE3IDEuMDU3NCAwLjQ5NTM3NkMxLjA5OCAwLjM5NzkzNiAxLjE1NzQ5IDAuMzA5NDk4IDEuMjMyNDMgMC4yMzUxNjNDMS4zMDcxNSAwLjE2MTA1MyAxLjM5NTc2IDAuMTAyNDIgMS40OTMxOCAwLjA2MjYyNzFDMS41OTA2MSAwLjAyMjgzNDUgMS42OTQ5MyAwLjAwMjY2NDQyIDEuODAwMTYgMC4wMDMyNzI4NFoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            right: '7px',
            path: {
              display: 'none',
            },
          },
          '& .MuiSelect-icon, .MuiAutocomplete-endAdornment .MuiSvgIcon-root': {
            backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDE2IDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjgwMDE2IDAuMDAzMjcyODRDMS45MDU0IDAuMDAyNjY0NCAyLjAwOTcyIDAuMDIyODM0NCAyLjEwNzE0IDAuMDYyNjI3MUMyLjIwNDU2IDAuMTAyNDIgMi4yOTMxNyAwLjE2MTA1MyAyLjM2Nzg5IDAuMjM1MTYzTDguMTk3MTEgNi4wNzIzN0wxNC4wMjYzIDAuMjM1MTYyQzE0LjE3NjkgMC4wODQ1OTA3IDE0LjM4MTEgMi44OTEyZS0wNyAxNC41OTQxIDIuNzA1MDVlLTA3QzE0LjgwNyAyLjUxODg5ZS0wNyAxNS4wMTEyIDAuMDg0NTkwNiAxNS4xNjE4IDAuMjM1MTYyQzE1LjMxMjQgMC4zODU3MzMgMTUuMzk2OSAwLjU4OTk1IDE1LjM5NjkgMC44MDI4OUMxNS4zOTY5IDEuMDE1ODMgMTUuMzEyNCAxLjIyMDA1IDE1LjE2MTggMS4zNzA2Mkw4Ljc2NDg0IDcuNzY3NTZDOC42OTA1IDcuODQyNTEgOC42MDIwNiA3LjkwMiA4LjUwNDYyIDcuOTQyNTlDOC40MDcxOCA3Ljk4MzE5IDguMzAyNjcgOC4wMDQwOSA4LjE5NzExIDguMDA0MDlDOC4wOTE1NSA4LjAwNDA5IDcuOTg3MDMgNy45ODMxOSA3Ljg4OTU5IDcuOTQyNTlDNy43OTIxNSA3LjkwMiA3LjcwMzcxIDcuODQyNTEgNy42MjkzOCA3Ljc2NzU2TDEuMjMyNDMgMS4zNzA2MkMxLjE1NzQ5IDEuMjk2MjggMS4wOTggMS4yMDc4NSAxLjA1NzQgMS4xMTA0MUMxLjAxNjgxIDEuMDEyOTYgMC45OTU5MDYgMC45MDg0NSAwLjk5NTkwNiAwLjgwMjg5MUMwLjk5NTkwNiAwLjY5NzMzMiAxLjAxNjgxIDAuNTkyODE3IDEuMDU3NCAwLjQ5NTM3NkMxLjA5OCAwLjM5NzkzNiAxLjE1NzQ5IDAuMzA5NDk4IDEuMjMyNDMgMC4yMzUxNjNDMS4zMDcxNSAwLjE2MTA1MyAxLjM5NTc2IDAuMTAyNDIgMS40OTMxOCAwLjA2MjYyNzFDMS41OTA2MSAwLjAyMjgzNDUgMS42OTQ5MyAwLjAwMjY2NDQyIDEuODAwMTYgMC4wMDMyNzI4NFoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            right: '7px',
            path: {
              display: 'none',
            },
          },
        },
      },
    },
  },
});

export const theme = themeWME;
