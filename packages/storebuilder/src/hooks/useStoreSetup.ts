import { useContext } from 'react';
import {
	StoreSetupContext,
	StoreSetupProviderContextInterface
} from '@store/contexts/StoreSetupProvider';

export function useStoreSetup() {
	const {
		storeSetupState,
		setFormValue,
		submitForm,
		resetFormValue,
		setIsLoading,
		getRegions,
		setRegion,
		getSelectedRegion,
		getStates,
		getSelectedState,
		getLocales,
		getLocaleByRegion,
		getCurrentLocale
	} = useContext(StoreSetupContext) as StoreSetupProviderContextInterface;
	return {
		storeSetupState,
		setFormValue,
		submitForm,
		resetFormValue,
		setIsLoading,
		getRegions,
		setRegion,
		getSelectedRegion,
		getStates,
		getSelectedState,
		getLocales,
		getLocaleByRegion,
		getCurrentLocale
	};
}
