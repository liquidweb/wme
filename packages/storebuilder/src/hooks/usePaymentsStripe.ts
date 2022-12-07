import { useContext } from '@wordpress/element';
import { PaymentsStripeContext, PaymentsStripeProviderContextInterface } from '@store/contexts/PaymentsStripeProvider';

export function usePaymentsStripe() {
	const {
		paymentsStripeState,
		setOauthStarted,
		setStripeKeys,
		setPluginActive,
		setPluginInstalled,
		setError,
		setIsLoading,
		installPlugin,
		setOauthUrl
	} = useContext(PaymentsStripeContext) as PaymentsStripeProviderContextInterface;
	return {
		paymentsStripeState,
		setOauthStarted,
		setStripeKeys,
		setPluginActive,
		setPluginInstalled,
		setError,
		setIsLoading,
		installPlugin,
		setOauthUrl
	};
}
