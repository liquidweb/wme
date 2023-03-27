import { useContext } from 'react';
import { WizardContext, WizardProviderContextInterface } from '@site/contexts/WizardProvider';

export function useWizard() {
	const {
		wizardState,
		currentStep,
		goToStep,
		goToNextStep,
		goToPreviousStep,
		closeAll,
		setShowCloseWarning,
		setHideExit,
		setActiveDevice
	} = useContext(WizardContext) as WizardProviderContextInterface;
	return {
		wizardState,
		currentStep,
		goToStep,
		goToNextStep,
		goToPreviousStep,
		closeAll,
		setShowCloseWarning,
		setHideExit,
		setActiveDevice
	};
}
