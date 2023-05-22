import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { pxToRem } from '@moderntribe/wme-utils';

const defaultTheme = createTheme();

declare module '@mui/material/styles/createPalette' {
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
	interface Palette {
		sidebar: TypeSidebar;
		brands: TypeBrands;
		border: TypeBorder;
		todo: TypeTodo;
	}
  }

let theme = {
	shadows: [...defaultTheme.shadows, '0 0 32px rgba(0, 0, 0, 0.1)'], // Additional shadow definition.
	typography: {
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
					fontSize: pxToRem(14),
					fontWeight: 600,
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
