import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { pxToRem } from '@moderntribe/wme-utils';

const defaultTheme = createTheme();

declare module '@mui/material/styles/createPalette' {
	interface PaletteColor {
		white?: string;
	}
	interface SimplePaletteColorOptions {
		white?: string;
	}
	interface TypeSidebar {
		text?: string;
		background?: string;
	}
	interface TypeBrands {
		paypal?: string;
		stripe?: string;
	}
	interface TypeBorder {
		ui?: string;
		layout?: string;
		dark?: string;
	}
	interface TypeTodo {
		main?: string;
		background?: string;
	}
	interface TypeCompleted {
		main?: string;
		background?: string;
	}
	interface Palette {
		sidebar: TypeSidebar;
		brands: TypeBrands;
		border: TypeBorder;
		todo: TypeTodo;
	}
	interface PaletteOptions {
		sidebar?: TypeSidebar;
		brands?: TypeBrands;
		border?: TypeBorder;
		completed?: TypeCompleted;
	}
  }

let theme = {
	palette: {
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
			main: '#F44336',
		},
		warning: {
			main: '#FF9900',
		},
		success: {
			main: '#4FB669',
		},
		brands: {
			stripe: '#645FF3',
			paypal: '#172C70',
		},
		border: {
			ui: '#C4C4C4',
			layout: '#C4C4C4',
			dark: '#000000',
		}
	},
	shadows: [...defaultTheme.shadows, '0 0 32px rgba(0, 0, 0, 0.1)'], // Additional shadow definition.
	typography: {
		allVariants: {
			color: '#2A3353'
		},
		fontFamily: 'inherit',
		h1: {
			fontSize: pxToRem(32),
			fontWeight: 400,
			letterSpacing: '-0.05em'
		},
		h2: {
			letterSpacing: '-0.03em'
		},
		h3: {
			fontSize: pxToRem(24),
			fontWeight: 400,
			letterSpacing: '-0.03em'
		},
		h4: {
			fontSize: pxToRem(16),
			fontWeight: 600
		},
		subtitle1: {
			fontSize: pxToRem(18),
			fontWeight: 400,
			letterSpacing: '-0.01em'
		},
		body1: {
			fontSize: '1rem',
			letterSpacing: '-0.01em'
		},
		body2: {
			fontSize: pxToRem(14),
			letterSpacing: '-0.01em'
		},
		overline: {
			display: 'inline-block',
			textTransform: 'none'
		}
	},
	components: {
		MuiChip: {
			styleOverrides: {
				color: 'black',
				icon: {
					color: 'currentColor'
				}
			}
		},
		MuiStep: {
			styleOverrides: {
				root: {
					paddingRight: pxToRem(12),
					paddingLeft: pxToRem(12)
				}
			}
		},
		MuiStepLabel: {
			styleOverrides: {
				root: {
					whiteSpace: 'nowrap'
				}
			}
		},
		MuiStepIcon: {
			styleOverrides: {
				root: {
					width: pxToRem(18)
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					boxShadow: 'none',

					'&:hover': {
						boxShadow: 'none'
					}
				}
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					color: '#2A3353',
					fontSize: pxToRem(14),
					fontWeight: 600,

					'&.Mui-focused': {
						color: '#2A3353'
					}
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontSize: pxToRem(10),
					lineHeight: pxToRem(16),
					letterSpacing: -0.15,
					margin: 0
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-input': {
						padding: '4px 12px',
						border: 'none',

						'& ~ .MuiOutlinedInput-notchedOutline': {
							borderWidth: '1px'
						},

						'&:focus, &:focus-visible': {
							outline: 'none',
							boxShadow: 'none'
						},

						'&:focus ~ .MuiOutlinedInput-notchedOutline, &:focus-visible ~ .MuiOutlinedInput-notchedOutline':
							{
								borderColor: 'primary.dark'
							},

						'&.Mui-disabled': {
							backgroundColor: 'transparent',
							borderColor: 'transparent',

							'& ~ .MuiOutlinedInput-notchedOutline': {
								backgroundColor: 'rgba(63, 81, 181, 0.08)',
								borderColor: 'transparent'
							}
						}
					},
					'& ~ .MuiFormHelperText-root.Mui-error': {
						position: 'absolute',
						top: '-25px',
						right: 0,
						marginTop: 0
					},
					'& .MuiSelect-icon': {
						backgroundImage:
							'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDE2IDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjgwMDE2IDAuMDAzMjcyODRDMS45MDU0IDAuMDAyNjY0NCAyLjAwOTcyIDAuMDIyODM0NCAyLjEwNzE0IDAuMDYyNjI3MUMyLjIwNDU2IDAuMTAyNDIgMi4yOTMxNyAwLjE2MTA1MyAyLjM2Nzg5IDAuMjM1MTYzTDguMTk3MTEgNi4wNzIzN0wxNC4wMjYzIDAuMjM1MTYyQzE0LjE3NjkgMC4wODQ1OTA3IDE0LjM4MTEgMi44OTEyZS0wNyAxNC41OTQxIDIuNzA1MDVlLTA3QzE0LjgwNyAyLjUxODg5ZS0wNyAxNS4wMTEyIDAuMDg0NTkwNiAxNS4xNjE4IDAuMjM1MTYyQzE1LjMxMjQgMC4zODU3MzMgMTUuMzk2OSAwLjU4OTk1IDE1LjM5NjkgMC44MDI4OUMxNS4zOTY5IDEuMDE1ODMgMTUuMzEyNCAxLjIyMDA1IDE1LjE2MTggMS4zNzA2Mkw4Ljc2NDg0IDcuNzY3NTZDOC42OTA1IDcuODQyNTEgOC42MDIwNiA3LjkwMiA4LjUwNDYyIDcuOTQyNTlDOC40MDcxOCA3Ljk4MzE5IDguMzAyNjcgOC4wMDQwOSA4LjE5NzExIDguMDA0MDlDOC4wOTE1NSA4LjAwNDA5IDcuOTg3MDMgNy45ODMxOSA3Ljg4OTU5IDcuOTQyNTlDNy43OTIxNSA3LjkwMiA3LjcwMzcxIDcuODQyNTEgNy42MjkzOCA3Ljc2NzU2TDEuMjMyNDMgMS4zNzA2MkMxLjE1NzQ5IDEuMjk2MjggMS4wOTggMS4yMDc4NSAxLjA1NzQgMS4xMTA0MUMxLjAxNjgxIDEuMDEyOTYgMC45OTU5MDYgMC45MDg0NSAwLjk5NTkwNiAwLjgwMjg5MUMwLjk5NTkwNiAwLjY5NzMzMiAxLjAxNjgxIDAuNTkyODE3IDEuMDU3NCAwLjQ5NTM3NkMxLjA5OCAwLjM5NzkzNiAxLjE1NzQ5IDAuMzA5NDk4IDEuMjMyNDMgMC4yMzUxNjNDMS4zMDcxNSAwLjE2MTA1MyAxLjM5NTc2IDAuMTAyNDIgMS40OTMxOCAwLjA2MjYyNzFDMS41OTA2MSAwLjAyMjgzNDUgMS42OTQ5MyAwLjAwMjY2NDQyIDEuODAwMTYgMC4wMDMyNzI4NFoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=")',
						backgroundPosition: 'center center',
						backgroundRepeat: 'no-repeat',
						right: '7px',
						path: {
							display: 'none'
						}
					}
				}
			}
		}
	}
};

// styleOverrides from WME framework.

theme = deepmerge(theme, {
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					// SetupCard
					'&.WmeSetupCard-root': {
						marginTop: '16px',
						marginBottom: '16px',
					}
				}
			}
		},
		MuiModal: {
			styleOverrides: {
				root: {
					// Wizard Overrides.
					zIndex: 99999,
					// WizardContent Overrides.
					'& .WmeWizard-dialogContent': {
						paddingBottom: '64px',
					},
					// WizardFooter Overrides.
					'& .WmeWizardFooter-next': {
						'& .WmeWizardFooterNextButton': {
							'&.isLastStep': {
								backgroundColor: '#4FB669',
								'&:hover': {
									backgroundColor: '#4FB669'
								}
							},
							transition: 'all ease .3s',
							fontWeight: '500',
							'& .MuiButton-endIcon': {
								position: 'absolute',
								transition: 'all ease .3s',
								opacity: 0,
								right: '16px'
							},
							'&:hover, &:active': {
								transition: 'all ease .3s',
								paddingRight: '32px',
								'& .MuiButton-endIcon': {
									opacity: 1
								}
							}
						}
					},
					// WizardSectionTitle Overrides.
					'& .WmeWizardSectionTitle-root': {
						'& .MuiTypography-h1.WmeWizardSectionTitle-heading': {
							fontSize: pxToRem(48),
							fontWeight: 400,
							letterSpacing: '-0.02em',
							marginBottom: 24,
							'&.isBookend': {
								marginBottom: 32
							}
						},
						'& .MuiTypography-h2.WmeWizardSectionTitle-heading': {
							fontSize: pxToRem(32),
							fontWeight: 400,
							letterSpacing: '-0.02em',
							marginBottom: 16,
							'&.isBookend': {
								marginBottom: 24
							}
						}
					},
					// Input Helper Overrides.
					'& .WmeInputHelperText-root': {
						marginTop: 8
					},
					// Video Embed.
					'& .WmeVideoEmbed-root': {
						width: '100%'
					}
				}
			}
		},
		MuiPopover: {
			styleOverrides: {
				root: {
					'&.MuiMenu-root': {
						zIndex: '99999'
					}
				}
			}
		},
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					'& .MuiInputBase-root': {
						paddingTop: 0,
						paddingBottom: 0,
					},
					'& .MuiInputBase-input': {
						paddingTop: '4px',
						paddingBottom: '4px',
					},
				},
				popper: {
					zIndex: '99999',
				}
			}
		},
	}
});

export const SB_THEME = theme;
