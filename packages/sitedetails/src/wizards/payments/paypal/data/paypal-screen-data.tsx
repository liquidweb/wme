import { __ } from '@wordpress/i18n';
import { paymentsPaypalConsts } from './constants';

import { GetStarted, AccountKeys, Success } from '../screens';
import { PAYMENTS_PAYPAL_PROPS } from '@store/constants';

export interface PaymentsPaypalInterface {
	keys: {
		email: string;
		merchantId: string;
		clientId: string;
	};
	plan: string;
	oauthStarted: boolean;
	steps: Array<StepInterface>;
	pluginInstalled: boolean;
	pluginActive: boolean;
	error: boolean;
	isLoading: boolean;
	oauthUrls: {
		standard: string;
		advanced: string;
		onboardingNonce: string;
	},
}

const PaymentsPaypalScreenData = (): PaymentsPaypalInterface => ({
	keys: {
		email: '',
		merchantId: '',
		clientId: '',
	},
	plan: 'standard',
	oauthStarted: false,
	pluginInstalled: PAYMENTS_PAYPAL_PROPS.plugin.installed || false,
	pluginActive: PAYMENTS_PAYPAL_PROPS.plugin.active || false,
	error: false,
	isLoading: false,
	oauthUrls: {
		standard: '',
		advanced: '',
		onboardingNonce: '',
	},
	steps: [
		{
			id: 0,
			label: paymentsPaypalConsts.getStarted.label,
			hideSkip: true,
			nextText: __('Next', 'moderntribe-storebuilder'),
			hideBack: true,
			screen: <GetStarted />,
		},
		{
			id: 1,
			label: paymentsPaypalConsts.accountKeys.label,
			nextText: __('Next', 'moderntribe-storebuilder'),
			screen: <AccountKeys />,
		},
		{
			id: 2,
			nextText: __('Complete', 'moderntribe-storebuilder'),
			hidePagination: true,
			screen: <Success />
		}
	],
});

export default PaymentsPaypalScreenData;
