import { useContext } from 'react';
import { WizardContext, WizardProviderContextInterface } from '../contexts/WizardProvider';

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
		setActiveDevice,
		setError
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
		setActiveDevice,
		setError
	};
}
