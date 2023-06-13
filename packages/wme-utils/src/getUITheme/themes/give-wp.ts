export const giveWpTheme = {
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
