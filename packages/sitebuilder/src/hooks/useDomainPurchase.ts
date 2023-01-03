import { useContext } from 'react';
import { DomainPurchaseContext } from '@sb/contexts/DomainPurchaseProvider';

export function useDomainPurchase() {
	const {
		goLiveState,
		setGoLiveState,
		submitGoLiveForm,
		submitDomainVerification,
		setIsLoading,
		setHasDomain,
		setShowPurchaseNavigation,
		handleDomainVerificationRequest,
		getHasDomainNextText
	} = useContext(DomainPurchaseContext) as GoLiveProviderContextInterface;
	return {
		goLiveState,
		setGoLiveState,
		submitGoLiveForm,
		submitDomainVerification,
		setIsLoading,
		setHasDomain,
		setShowPurchaseNavigation,
		handleDomainVerificationRequest,
		getHasDomainNextText
	};
}
