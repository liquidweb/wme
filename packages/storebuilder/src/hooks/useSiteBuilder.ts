import { useContext } from 'react';
import { StoreBuilderContext, StoreBuilderContextInterface } from '@store/contexts/StoreBuilderProvider';

export function useSiteBuilder() {
	const {
		storeBuilderState,
		setStoreBuilderState
	} = useContext(StoreBuilderContext) as StoreBuilderContextInterface;
	return {
		storeBuilderState,
		setStoreBuilderState
	};
}
