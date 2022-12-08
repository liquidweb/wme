import { __ } from '@wordpress/i18n';
import { paymentsStripeConsts } from './constants';
import { GetStarted, AccountKeys, Success } from '../screens';
import { PAYMENTS_STRIPE_PROPS } from '@store/constants';

export interface PaymentsStripeInterface {
	keys: {
		publishable: string;
		secret: string;
	};
	oauthStarted: boolean;
	steps: Array<StepInterface>;
	pluginActive: boolean;
	pluginInstalled: boolean;
	oauthUrl: string;
	error: boolean;
	isLoading: boolean;
}

const PaymentsStripeScreenData = (): PaymentsStripeInterface => ({
	keys: {
		publishable: '',
		secret: '',
	},
	oauthStarted: false,
	pluginInstalled: PAYMENTS_STRIPE_PROPS.plugin.installed || false,
	pluginActive: PAYMENTS_STRIPE_PROPS.plugin.active || false,
	oauthUrl: '',
	error: false,
	isLoading: false,
	steps: [
		{
			id: 0,
			label: paymentsStripeConsts.getStarted.label,
			hideSkip: true,
			nextText: __('Next', 'moderntribe-storebuilder'),
			hideBack: true,
			screen: <GetStarted />,
		},
		{
			id: 1,
			label: paymentsStripeConsts.accountKeys.label,
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

export default PaymentsStripeScreenData;
