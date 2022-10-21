import React, { createContext, useState } from 'react';
import PaymentsPaypalScreenData, { PaymentsPaypalInterface } from '@store/wizards/payments/paypal/data/paypal-screen-data';
import { handleActionRequest } from '@moderntribe/wme-utils';
import { PAYMENTS_PAYPAL_PROPS } from '@store/constants';
export interface PaymentsPaypalProviderContextInterface {
  paymentsPaypalState: PaymentsPaypalInterface;
  installPlugin: () => Promise<unknown>;
  setPlan: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  setOauthUrls: (oauthUrls: { standard: string, advanced: string, onboardingNonce: string }) => void;
  setOauthStarted: (value: boolean) => void;
  setPluginActive: (value: boolean) => void;
  setPluginInstalled: (value: boolean) => void;
  setPaypalKeys: (email:string, merchantId: string, clientId: string) => void;
  setError: (value: boolean) => void;
}

export const PaymentsPaypalContext = createContext<PaymentsPaypalProviderContextInterface | null>(null);

const PaymentsPaypalProvider = ({ children }: { children: React.ReactNode }) => {
	const [paymentsPaypalState, setPaymentsPaypalState] = useState<PaymentsPaypalInterface>(PaymentsPaypalScreenData());
	const paypalNonce = PAYMENTS_PAYPAL_PROPS.ajax.nonce || '';
	const paypalAction = PAYMENTS_PAYPAL_PROPS.ajax.action || '';

	const setOauthUrls = (oauthUrls: { standard: string, advanced: string, onboardingNonce: string }) => {
		setPaymentsPaypalState({
			...paymentsPaypalState,
			oauthUrls,
		});
	};

	const installPlugin = async () => {
		setPaymentsPaypalState({
			...paymentsPaypalState,
			isLoading: true,
			oauthStarted: true
		});

		const data = {
			_wpnonce: paypalNonce,
			action: paypalAction,
			sub_action: 'install_plugin'
		};

		const response = await handleActionRequest(data);
		return response;
	};

	const setPlan = (value: string) => {
		setPaymentsPaypalState({
			...paymentsPaypalState,
			plan: value
		});
	};

	const setPluginActive = (value: boolean) => {
		setPaymentsPaypalState({
			...paymentsPaypalState,
			pluginActive: value
		});
	};

	const setPluginInstalled = (value: boolean) => {
		setPaymentsPaypalState({
			...paymentsPaypalState,
			pluginInstalled: value
		});
	};

	const setOauthStarted = (value: boolean) => {
		setPaymentsPaypalState({
			...paymentsPaypalState,
			oauthStarted: value
		});
	};

	const setError = (value: boolean) => {
		setPaymentsPaypalState({
			...paymentsPaypalState,
			error: value
		});
	};

	const setIsLoading = (value: boolean) => {
		setPaymentsPaypalState({
			...paymentsPaypalState,
			isLoading: value
		});
	};

	const setPaypalKeys = (email:string, merchantId: string, clientId: string) => {
		setPaymentsPaypalState({
			...paymentsPaypalState,
			keys: {
				email,
				merchantId,
				clientId,
			}
		});
	};

	return (
		<PaymentsPaypalContext.Provider value={ {
			paymentsPaypalState,
			setPlan,
			setOauthStarted,
			setPaypalKeys,
			setPluginActive,
			setPluginInstalled,
			setError,
			setOauthUrls,
			installPlugin,
			setIsLoading
		} }>
			{ children }
		</PaymentsPaypalContext.Provider>
	);
};

export default PaymentsPaypalProvider;
