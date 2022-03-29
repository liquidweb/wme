/* eslint-disable no-unused-vars */
import { createTheme } from '@mui/material/styles';
import { pxToRem } from '../utils';

declare module '@mui/material/styles' {
 interface Theme {

 }

 interface Palette {
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

 interface PaletteOptions {
  sidebar?: TypeSidebar;
  todo?: TypeStatus;
  completed?: TypeStatus;
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
  // components: {
  //  MuiChip: {
  //   styleOverrides: {
  //    icon: {
  //     color: 'currentColor',
  //    }
  //   }
  //  },
  //  MuiStep: {
  //   styleOverrides: {
  //    root: {
  //     paddingRight: pxToRem(12),
  //     paddingLeft: pxToRem(12),
  //    }
  //   }
  //  },
  //  MuiStepLabel: {
  //   styleOverrides: {
  //    root: {
  //     whiteSpace: 'nowrap',
  //    }
  //   }
  //  },
  //  MuiStepIcon: {
  //   styleOverrides: {
  //    root: {
  //     width: pxToRem(18),
  //    }
  //   }
  //  },
  //  MuiButton: {
  //   styleOverrides: {
  //    root: {
  //     textTransform: 'none',
  //     boxShadow: 'none',

  //     '&:hover': {
  //      boxShadow: 'none',
  //     }
  //    }
  //   }
  //  },
  //  MuiFormLabel: {
  //   styleOverrides: {
  //    root: {
  //     color: '#2A3353',
  //     fontSize: pxToRem(14),
  //     fontWeight: 600,

  //     '&.Mui-focused': {
  //      color: '#2A3353',
  //     }
  //    }
  //   }
  //  },
  //  MuiFormHelperText: {
  //   styleOverrides: {
  //    root: {
  //     fontSize: pxToRem(10),
  //     lineHeight: pxToRem(16),
  //     letterSpacing: -0.15,
  //     margin: 0,
  //    }
  //   }
  //  },
  //  MuiOutlinedInput: {
  //   styleOverrides: {
  //    root: {
  //     '& .MuiOutlinedInput-input': {
  //      padding: '4px 12px',
  //      border: 'none',

  //      '& ~ .MuiOutlinedInput-notchedOutline': {
  //       borderWidth: '1px',
  //      },

  //      '&:focus, &:focus-visible': {
  //       outline: 'none',
  //       boxShadow: 'none',
  //      },

  //      '&:focus ~ .MuiOutlinedInput-notchedOutline,' +
  //      '&: focus - visible ~ .MuiOutlinedInput - notchedOutline': {
  //       borderColor: 'primary.dark',
  //      },

  //      '&.Mui-disabled': {
  //       backgroundColor: 'transparent',
  //       borderColor: 'transparent',

  //       '& ~ .MuiOutlinedInput-notchedOutline': {
  //        backgroundColor: 'rgba(63, 81, 181, 0.08)',
  //        borderColor: 'transparent',
  //       },
  //      },
  //     },

  //     '& ~ .MuiFormHelperText-root.Mui-error': {
  //      position: 'absolute',
  //      top: '-25px',
  //      right: 0,
  //      marginTop: 0,
  //     }
  //    }
  //   }
  //  }
  // }
});
