import { useContext } from 'react';
import { DomainPurchaseContext } from '@site/contexts/DomainPurchaseProvider';

export function useDomainPurchase() {
	const {
		goLiveState,
		setGoLiveState,
		submitGoLiveForm,
		setIsLoading,
		setShowPurchaseNavigation,
	} = useContext(DomainPurchaseContext) as GoLiveProviderContextInterface;
	return {
		goLiveState,
		setGoLiveState,
		submitGoLiveForm,
		setIsLoading,
		setShowPurchaseNavigation,
	};
}
