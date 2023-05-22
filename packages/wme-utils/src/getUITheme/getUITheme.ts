/**
 * Returns the active MUI theme object
 *
 * @param {string} themeVariation
 * @return {object | null} MUI theme object
 * @see https://mui.com/material-ui/experimental-api/css-theme-variables/customization
 */

const kadenceTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0073e6',
          light: '#edeff7',
          dark: '#005cb8',
        },
        background: {
          dark: '#005cb8',
        },
      },
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.WmeCheckboxInput-root.Mui-checked .MuiSvgIcon-root': {
            fill: '#0073e6',
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          /* CardSelect */
          '& .WmeCardSelectGroup-root .MuiButtonBase-root.WmeCardSelectItem-root': {
            '&.Mui-selected, & + .MuiButtonBase-root.WmeCardSelectItem-root.Mui-selected': {
              borderColor: '#0073e6',
            },
            '&:focus, & + .MuiButtonBase-root.WmeCardSelectItem-root:focus': {
              borderColor: '#0073e6',
            },
            '&:hover, & + .MuiButtonBase-root.WmeCardSelectItem-root:hover': {
              borderColor: '#0073e6',
            },
          },
        },
      },
    },
  },
};
const givewpTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#11772A',
          light: '#EDF7ED',
          dark: '#083F15',
        },
        background: {
          dark: '#083F15',
        },
      },
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.WmeCheckboxInput-root.Mui-checked .MuiSvgIcon-root': {
            fill: '#11772A',
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          /* CardSelect */
          '& .WmeCardSelectGroup-root .MuiButtonBase-root.WmeCardSelectItem-root': {
            '&.Mui-selected, & + .MuiButtonBase-root.WmeCardSelectItem-root.Mui-selected': {
              borderColor: '#11772A',
            },
            '&:focus, & + .MuiButtonBase-root.WmeCardSelectItem-root:focus': {
              borderColor: '#11772A',
            },
            '&:hover, & + .MuiButtonBase-root.WmeCardSelectItem-root:hover': {
              borderColor: '#11772A',
            },
          },
        },
      },
    },
  },
};

export const getUITheme = (themeVariation: string): object => {
  if (themeVariation === 'kadence') {
    return kadenceTheme;
  }
  if (themeVariation === 'givewp') {
    return givewpTheme;
  }
  return {};
};
