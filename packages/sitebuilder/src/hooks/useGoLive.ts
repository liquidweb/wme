import { useContext } from 'react';
import { GoLiveContext, GoLiveProviderContextInterface } from '@sb/contexts/GoLiveProvider';

export function useGoLive() {
	const {
		goLiveState,
		setGoLiveState,
		submitGoLiveForm,
		submitDomainVerification,
		setIsLoading,
		setHasDomain,
		setShowConnectWithNexcess,
		handleDomainVerificationRequest,
		getHasDomainNextText
	} = useContext(GoLiveContext) as GoLiveProviderContextInterface;
	return {
		goLiveState,
		setGoLiveState,
		submitGoLiveForm,
		submitDomainVerification,
		setIsLoading,
		setHasDomain,
		setShowConnectWithNexcess,
		handleDomainVerificationRequest,
		getHasDomainNextText
	};
}
