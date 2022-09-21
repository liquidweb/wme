import { useContext } from 'react';
import {
	StoreSetupContext,
	FtcProviderContextInterface
} from '@store/contexts/StoreSetupProvider';

export function useStoreSetup() {
	const {
		ftcState,
		setFormValue,
		submitForm,
		resetFormValue,
		setIsLoading
	} = useContext(StoreSetupContext) as FtcProviderContextInterface;
	return {
		ftcState,
		setFormValue,
		submitForm,
		resetFormValue,
		setIsLoading
	};
}
