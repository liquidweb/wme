import { useContext } from '@wordpress/element';
import { PaymentsPaypalContext, PaymentsPaypalProviderContextInterface } from '@store/contexts/PaymentsPaypalProvider';

export function usePaymentsPaypal() {
	const {
		paymentsPaypalState,
		setPlan,
		setOauthStarted,
		setPaypalKeys,
		setPluginActive,
		setPluginInstalled,
		setError,
		setIsLoading,
		installPlugin,
		setOauthUrls
	} = useContext(PaymentsPaypalContext) as PaymentsPaypalProviderContextInterface;
	return {
		paymentsPaypalState,
		setPlan,
		setOauthStarted,
		setPaypalKeys,
		setPluginActive,
		setPluginInstalled,
		setError,
		setIsLoading,
		installPlugin,
		setOauthUrls
	};
}
