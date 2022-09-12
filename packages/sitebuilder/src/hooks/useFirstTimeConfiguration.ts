import { useContext } from 'react';
import {
	FirstTimeConfigurationContext,
	FtcProviderContextInterface
} from '../contexts/FirstTimeConfigurationProvider';

export function useFirstTimeConfiguration() {
	const {
		ftcState,
		setFormValue,
		submitForm,
		resetFormValue,
		setIsLoading,
		setLogoValue,
		validateUsernamePassword
	} = useContext(
		FirstTimeConfigurationContext
	) as FtcProviderContextInterface;
	return {
		ftcState,
		setFormValue,
		submitForm,
		resetFormValue,
		setIsLoading,
		setLogoValue,
		validateUsernamePassword
	};
}
