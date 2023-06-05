/**
 * Returns the active MUI theme object
 *
 * @param {string} themeVariation
 * @return {object} MUI theme object
 * @see https://mui.com/material-ui/experimental-api/css-theme-variables/customization
 */

const kadenceTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0073E6',
          light: '#52A4F6',
          dark: '#005CB8',
        },
        background: {
          dark: '#2D3748',
        },
      },
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.WmeCheckboxInput-root.Mui-checked .MuiSvgIcon-root': {
            fill: '#0073E6',
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
              borderColor: '#0073E6',
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
const giveWpTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#69B86B',
          light: '#87C689',
          dark: '#438744',
        },
        background: {
          dark: '#333333',
        },
      },
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.WmeCheckboxInput-root.Mui-checked .MuiSvgIcon-root': {
            fill: '#69B86B',
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
              borderColor: '#69B86B',
            },
            '&:focus, & + .MuiButtonBase-root.WmeCardSelectItem-root:focus': {
              borderColor: '#69B86B',
            },
            '&:hover, & + .MuiButtonBase-root.WmeCardSelectItem-root:hover': {
              borderColor: '#69B86B',
            },
          },
        },
      },
    },
  },
};
const restrictContentProTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#640AF8',
          light: '#A56EFF',
          dark: '#4204A7',
        },
        background: {
          dark: '#222222',
        },
      },
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.WmeCheckboxInput-root.Mui-checked .MuiSvgIcon-root': {
            fill: '#640AF8',
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
              borderColor: '#640AF8',
            },
            '&:focus, & + .MuiButtonBase-root.WmeCardSelectItem-root:focus': {
              borderColor: '#640AF8',
            },
            '&:hover, & + .MuiButtonBase-root.WmeCardSelectItem-root:hover': {
              borderColor: '#640AF8',
            },
          },
        },
      },
    },
  },
};
const iconicWpTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#E0394C',
          light: '#F65164',
          dark: '#B91E30',
        },
        background: {
          dark: '#24242D',
        },
      },
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.WmeCheckboxInput-root.Mui-checked .MuiSvgIcon-root': {
            fill: '#E0394C',
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
              borderColor: '#E0394C',
            },
            '&:focus, & + .MuiButtonBase-root.WmeCardSelectItem-root:focus': {
              borderColor: '#E0394C',
            },
            '&:hover, & + .MuiButtonBase-root.WmeCardSelectItem-root:hover': {
              borderColor: '#E0394C',
            },
          },
        },
      },
    },
  },
};
const eventsCalendarTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#334AFF',
          light: '#7484FF',
          dark: '#1C39BB',
        },
        background: {
          dark: '#0F1031',
        },
      },
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.WmeCheckboxInput-root.Mui-checked .MuiSvgIcon-root': {
            fill: '#334AFF',
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
              borderColor: '#334AFF',
            },
            '&:focus, & + .MuiButtonBase-root.WmeCardSelectItem-root:focus': {
              borderColor: '#334AFF',
            },
            '&:hover, & + .MuiButtonBase-root.WmeCardSelectItem-root:hover': {
              borderColor: '#334AFF',
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
  if (themeVariation === 'giveWp') {
    return giveWpTheme;
  }
  if (themeVariation === 'restrictContentPro') {
    return restrictContentProTheme;
  }
  if (themeVariation === 'iconicWp') {
    return iconicWpTheme;
  }
  if (themeVariation === 'eventsCalendar') {
    return eventsCalendarTheme;
  }
  return {};
};
