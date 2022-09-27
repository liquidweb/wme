import { useContext } from 'react';
import {
	StoreSetupContext,
	StoreSetupProviderContextInterface
} from '@store/contexts/StoreSetupProvider';

export function useStoreSetup() {
	const {
		storeState,
		setFormValue,
		submitForm,
		resetFormValue,
		setIsLoading,
		getRegions,
		setRegion,
		getSelectedRegion,
		getStates,
		getSelectedState,
		getCurrentLocale
	} = useContext(StoreSetupContext) as StoreSetupProviderContextInterface;
	return {
		storeState,
		setFormValue,
		submitForm,
		resetFormValue,
		setIsLoading,
		getRegions,
		setRegion,
		getSelectedRegion,
		getStates,
		getSelectedState,
		getCurrentLocale
	};
}
