import { __ } from '@wordpress/i18n';

export const paymentsStripeConsts = {
	getStarted: {
		heading: __('Get started with Stripe', 'moderntribe-storebuilder'),
		copy: __('Connect or create a Stripe account to accept payments directly onsite, including Payment Request buttons (such as Apple Pay and Google Pay), iDEAL, SEPA, Sofort, and more international payment methods.', 'moderntribe-storebuilder'),
		terms: __('By clicking "Connect Stripe", you agree to the Terms of Service.', 'moderntribe-storebuilder'),
		label: __('Connect Your Account', 'moderntribe-storebuilder'),
		stripeAlt: __('stripe logo', 'moderntribe-storebuilder')
	},
	accountKeys: {
		heading: __('Stripe Account Keys', 'moderntribe-storebuilder'),
		copy: __('Nice! Now that you\'ve activated, we\'ve imported your keys here for you. These keys are specific to your account and will ensure you\'re all set to accept payments on your store.', 'moderntribe-storebuilder'),
		livePublishableKey: __('Live publishable key', 'moderntribe-storebuilder'),
		liveSecretKey: __('Live secret key', 'moderntribe-storebuilder'),
		livePublishableHelper: __('Only values starting with "pk_live_" will be saved.', 'moderntribe-storebuilder'),
		liveSecretHelper: __('Only values starting with "sk_live_" or "rk_live_" will be saved.', 'moderntribe-storebuilder'),
		label: __('Your Account Keys', 'moderntribe-storebuilder')
	},
	success: {
		heading: __('You\'re ready to accept Payments with Stripe on your Store!', 'moderntribe-storebuilder'),
		copy: __('That was easy. Your Stripe account is connected. You can manage your Stripe payment settings to configure checkout experience, transaction preferences and more.', 'moderntribe-storebuilder'),
		manageTitleText: __('Next up: Configure Payment Settings', 'moderntribe-storebuilder'),
		manageBtnText: __('Manage Stripe Payment Settings', 'moderntribe-storebuilder'),
		nextStepImageAlt: __('different brands of credit cards', 'moderntribe-storebuilder')
	}
};
