import { useContext } from 'react';
import {
	StoreSetupContext,
	StoreSetupProviderContextInterface
} from '@store/contexts/StoreSetupProvider';

export function useStoreSetup() {
	const {
		storeSetupState,
		setStateAndFormValue,
		setFormValue,
		submitForm,
		isScreenTouched,
		resetFormValues,
		setIsLoading,
		getRegions,
		setRegion,
		getSelectedRegion,
		getStates,
		getSelectedState,
		getLocales,
		getLocaleByRegion,
		getCurrentLocale,
		setCurrency,
		setProductTypes,
		setProductCount
	} = useContext(StoreSetupContext) as StoreSetupProviderContextInterface;
	return {
		storeSetupState,
		setStateAndFormValue,
		setFormValue,
		submitForm,
		isScreenTouched,
		resetFormValues,
		setIsLoading,
		getRegions,
		setRegion,
		getSelectedRegion,
		getStates,
		getSelectedState,
		getLocales,
		getLocaleByRegion,
		getCurrentLocale,
		setCurrency,
		setProductTypes,
		setProductCount
	};
}
