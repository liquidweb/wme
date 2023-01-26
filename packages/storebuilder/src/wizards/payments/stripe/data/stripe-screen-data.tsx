import { __ } from '@wordpress/i18n';
import { paymentsStripeConsts } from './constants';
import { GetStarted, AccountKeys, Success } from '../screens';
import { IMAGE_DIR, PAYMENTS_STRIPE_PROPS } from '@store/constants';

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
			nextText: __('Connect Stripe', 'moderntribe-storebuilder'),
			hideBack: true,
			screen: <GetStarted />,
		},
		{
			id: 1,
			label: paymentsStripeConsts.accountKeys.label,
			title: __('Stripe Account Keys', 'moderntribe-storebuilder'),
			description: __('Nice! Now that you’ve activated, we’ve imported your keys here for you. These keys are specific to your account and will ensure you’re all set to accept payments on your store.', 'moderntribe-storebuilder'),
			subtext: <img src={ ` ${ IMAGE_DIR }stripe-logo-white.png ` } alt={ 'Stripe logo' } />,
			subtextIcon: null,
			nextText: __('Next', 'moderntribe-storebuilder'),
			hideBack: true,
			screen: <AccountKeys />,
		},
		{
			id: 2,
			title: __('You’re ready to accept Payments with Stripe on your Store!', 'moderntribe-storebuilder'),
			description: __('That was easy. Your Stripe account is connected. You can manage your Stripe payment settings to configure checkout experience, transaction preferences and more.', 'moderntribe-storebuilder'),
			subtext: <img src={ ` ${ IMAGE_DIR }stripe-logo-white.png ` } alt={ 'Stripe logo' } />,
			subtextIcon: null,
			nextText: __('Save & Complete', 'moderntribe-storebuilder'),
			hidePagination: true,
			screen: <Success />
		}
	],
});

export default PaymentsStripeScreenData;
