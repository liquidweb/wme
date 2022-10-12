import { __ } from '@wordpress/i18n';

export const paymentsStripeConsts = {
	getStarted: {
		heading: __('Get started with Stripe', 'nexcess-mapps'),
		copy: __('Connect or create a Stripe account to accept payments directly onsite, including Payment Request buttons (such as Apple Pay and Google Pay), iDEAL, SEPA, Sofort, and more international payment methods.', 'nexcess-mapps'),
		terms: __('By clicking "Connect Stripe", you agree to the Terms of Service.', 'nexcess-mapps'),
		label: __('Connect Your Account', 'nexcess-mapps'),
		stripeAlt: __('stripe logo', 'nexcess-mapps')
	},
	accountKeys: {
		heading: __('Stripe Account Keys', 'nexcess-mapps'),
		copy: __('Nice! Now that you\'ve activated, we\'ve imported your keys here for you. These keys are specific to your account and will ensure you\'re all set to accept payments on your store.', 'nexcess-mapps'),
		livePublishableKey: __('Live publishable key', 'nexcess-mapps'),
		liveSecretKey: __('Live secret key', 'nexcess-mapps'),
		livePublishableHelper: __('Only values starting with "pk_live_" will be saved.', 'nexcess-mapps'),
		liveSecretHelper: __('Only values starting with "sk_live_" or "rk_live_" will be saved.', 'nexcess-mapps'),
		label: __('Your Account Keys', 'nexcess-mapps')
	},
	success: {
		heading: __('You\'re ready to accept Payments with Stripe on your Store!', 'nexcess-mapps'),
		copy: __('That was easy. Your Stripe account is connected. You can manage your Stripe payment settings to configure checkout experience, transaction preferences and more.', 'nexcess-mapps'),
		manageTitleText: __('Next up: Configure Payment Settings', 'nexcess-mapps'),
		manageBtnText: __('Manage Stripe Payment Settings', 'nexcess-mapps'),
		nextStepImageAlt: __('different brands of credit cards', 'nexcess-mapps')
	}
};
