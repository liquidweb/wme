export const restrictContentProTheme = {
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
