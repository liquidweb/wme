import { useContext } from 'react';
import { DomainConnectContext } from '@sb/contexts/DomainConnectProvider';

export function useDomainConnect() {
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
	} = useContext(DomainConnectContext) as GoLiveProviderContextInterface;
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
