import { useContext } from 'react';
import { LookAndFeelContext, LookAndFeelProviderContextInterface } from '../contexts/LookAndFeelProvider';

export function useLookAndFeel() {
	const {
		lookAndFeelState,
		setInitialValues,
		resetStepData,
		setStepDataTouched,
		setIsLoading,
		setTemplateValue,
		setFontValue,
		setColorValue,
		setIsImporting,
		setImportingError
	} = useContext(LookAndFeelContext) as LookAndFeelProviderContextInterface;
	return {
		lookAndFeelState,
		setInitialValues,
		resetStepData,
		setStepDataTouched,
		setIsLoading,
		setTemplateValue,
		setFontValue,
		setColorValue,
		setIsImporting,
		setImportingError
	};
}
