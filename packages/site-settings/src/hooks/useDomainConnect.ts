import { useContext } from 'react';
import { DomainConnectContext } from '@site/contexts/DomainConnectProvider';

export function useDomainConnect() {
	const {
		goLiveState,
		setGoLiveState,
		submitGoLiveForm,
		submitDomainVerification,
		setIsLoading,
		setShowPurchaseNavigation,
		handleDomainVerificationRequest,
	} = useContext(DomainConnectContext) as GoLiveProviderContextInterface;
	return {
		goLiveState,
		setGoLiveState,
		submitGoLiveForm,
		submitDomainVerification,
		setIsLoading,
		setShowPurchaseNavigation,
		handleDomainVerificationRequest,
	};
}
