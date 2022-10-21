import React, { createContext, useState } from 'react';
import PaymentsStripeScreenData, { PaymentsStripeInterface } from '@store/wizards/payments/stripe/data/stripe-screen-data';
import { handleActionRequest } from '@moderntribe/wme-utils';
import { PAYMENTS_STRIPE_PROPS } from '@store/constants';
export interface PaymentsStripeProviderContextInterface {
  paymentsStripeState: PaymentsStripeInterface;
  installPlugin: () => Promise<unknown>;
  setOauthUrl: (oauthUrl: string) => void;
  setOauthStarted: (value: boolean) => void;
  setPluginActive: (value: boolean) => void;
  setPluginInstalled: (value: boolean) => void;
  setStripeKeys: (publishable: string, secret: string) => void;
  setError: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
}

export const PaymentsStripeContext = createContext<PaymentsStripeProviderContextInterface | null>(null);

const PaymentsStripeProvider = ({ children }: { children: React.ReactNode }) => {
	const [paymentsStripeState, setPaymentsStripeState] = useState<PaymentsStripeInterface>(PaymentsStripeScreenData());
	const stripeNonce = PAYMENTS_STRIPE_PROPS.ajax.nonce || '';
	const stripeAction = PAYMENTS_STRIPE_PROPS.ajax.action || '';

	const setOauthUrl = (oauthUrl: string) => {
		setPaymentsStripeState({
			...paymentsStripeState,
			oauthUrl,
		});
	};

	const installPlugin = async () => {
		setPaymentsStripeState({
			...paymentsStripeState,
			isLoading: true,
			oauthStarted: true
		});

		const data = {
			_wpnonce: stripeNonce,
			action: stripeAction,
			sub_action: 'install_plugin'
		};

		const response = await handleActionRequest(data);

		return response;
	};

	const setPluginActive = (value: boolean) => {
		setPaymentsStripeState({
			...paymentsStripeState,
			pluginActive: value
		});
	};

	const setPluginInstalled = (value: boolean) => {
		setPaymentsStripeState({
			...paymentsStripeState,
			pluginInstalled: value
		});
	};

	const setOauthStarted = (value: boolean) => {
		setPaymentsStripeState({
			...paymentsStripeState,
			oauthStarted: value
		});
	};

	const setError = (value: boolean) => {
		setPaymentsStripeState({
			...paymentsStripeState,
			error: value
		});
	};

	const setIsLoading = (value: boolean) => {
		setPaymentsStripeState({
			...paymentsStripeState,
			isLoading: value
		});
	};

	const setStripeKeys = (publishable: string, secret: string) => {
		setPaymentsStripeState({
			...paymentsStripeState,
			keys: {
				publishable,
				secret
			}
		});
	};

	return (
		<PaymentsStripeContext.Provider value={ {
			paymentsStripeState,
			setOauthStarted,
			setStripeKeys,
			setPluginActive,
			setPluginInstalled,
			setError,
			setOauthUrl,
			installPlugin,
			setIsLoading
		} }>
			{ children }
		</PaymentsStripeContext.Provider>
	);
};

export default PaymentsStripeProvider;
