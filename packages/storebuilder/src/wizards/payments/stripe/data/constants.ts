import { __ } from '@wordpress/i18n';

export const paymentsStripeConsts = {
	getStarted: {
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
		heading: __('Next Up', 'moderntribe-storebuilder'),
		copy: __('Now that we’re set up, you can further customize your Stripe settings in the Stripe Settings page.', 'moderntribe-storebuilder'),
		manageTitleText: __('Configure Payment Settings', 'moderntribe-storebuilder'),
		manageBtnText: __('Manage Stripe Payment Settings', 'moderntribe-storebuilder'),
		nextStepImageAlt: __('different brands of credit cards', 'moderntribe-storebuilder')
	}
};
