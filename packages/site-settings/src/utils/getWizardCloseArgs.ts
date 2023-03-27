export interface WizardCloseInterface {
	showCloseWarning: boolean;
	navigateTo: string;
}

export const getWizardCloseArgs = (): WizardCloseInterface => {
	return {
		showCloseWarning: false,
		navigateTo: '/',
	};
};
