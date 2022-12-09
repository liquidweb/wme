import type { Location } from 'react-router-dom';
export interface WizardCloseInterface {
	showCloseWarning: boolean;
	navigateTo: string;
}

export const getWizardCloseArgs = (location: Location, step: number, hasStepped: boolean): WizardCloseInterface => {
	switch (location.pathname) {
	case '/wizard/ftc':
		return {
			showCloseWarning: hasStepped,
			navigateTo: '/',
		};
	case '/wizard/look-and-feel':
		return {
			showCloseWarning: false,
			navigateTo: '/',
		};
	default:
		return {
			showCloseWarning: false,
			navigateTo: '/',
		};
	}
};
