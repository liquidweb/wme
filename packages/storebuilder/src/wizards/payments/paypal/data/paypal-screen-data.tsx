import { __ } from '@wordpress/i18n';
import { paymentsPaypalConsts } from './constants';

import { GetStarted, AccountKeys, Success } from '../screens';
import {IMAGE_DIR, PAYMENTS_PAYPAL_PROPS} from '@store/constants';

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
			title: __('Get started with PayPal', 'moderntribe-storebuilder'),
			description: __('Choose an additional card processing method and/or continue to connect your PayPal account.', 'moderntribe-storebuilder'),
			subtext: <img src={ ` ${ IMAGE_DIR }paypal-logo-alternative.png ` } width={ 90 } alt={ 'Paypal logo' } />,
			subtextIcon: null,
			hideSkip: true,
			nextText: __('Next', 'moderntribe-storebuilder'),
			hideBack: true,
			screen: <GetStarted />,
		},
		{
			id: 1,
			label: paymentsPaypalConsts.accountKeys.label,
			title: __('Your PayPal Account Keys', 'moderntribe-storebuilder'),
			description: __('Nice! Now that you\'ve activated, we\'ve imported your keys here for you. These keys are specific to your account and will ensure you\'re all set to accept payments on your store.', 'moderntribe-storebuilder'),
			subtext: <img src={ ` ${ IMAGE_DIR }paypal-logo-alternative.png ` } width={ 90 } alt={ 'Paypal logo' } />,
			subtextIcon: null,
			nextText: __('Next', 'moderntribe-storebuilder'),
			screen: <AccountKeys />,
		},
		{
			id: 2,
			nextText: __('Complete', 'moderntribe-storebuilder'),
			title: __('You\'re ready to accept PayPal Payments on your Store!', 'moderntribe-storebuilder'),
			description: __('That was easy. Your PayPal account is connected. If you\'d like you can customize your PayPal settings further in the WordPress Admin.', 'moderntribe-storebuilder'),
			subtext: <img src={ ` ${ IMAGE_DIR }paypal-logo-alternative.png ` } width={ 90 } alt={ 'Paypal logo' } />,
			subtextIcon: null,
			hidePagination: true,
			screen: <Success />
		}
	],
});

export default PaymentsPaypalScreenData;
