import { useContext } from 'react';
import { StoreBuilderContext, StoreBuilderContextInterface } from '@store/contexts/StoreBuilderProvider';

export function useStoreBuilder() {
	const {
		storeBuilderState,
		setStoreBuilderState,
		setScrollPosition
	} = useContext(StoreBuilderContext) as StoreBuilderContextInterface;
	return {
		storeBuilderState,
		setStoreBuilderState,
		setScrollPosition
	};
}
