export const solidWpTheme = {
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#9675F7',
          light: '#B79EFF',
          dark: '#6E4ADA',
        },
        background: {
          dark: '#1F1F1F',
        },
      },
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.WmeCheckboxInput-root.Mui-checked .MuiSvgIcon-root': {
            fill: '#9675F7',
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
              borderColor: '#9675F7',
            },
            '&:focus, & + .MuiButtonBase-root.WmeCardSelectItem-root:focus': {
              borderColor: '#9675F7',
            },
            '&:hover, & + .MuiButtonBase-root.WmeCardSelectItem-root:hover': {
              borderColor: '#9675F7',
            },
          },
        },
      },
    },
  },
};
