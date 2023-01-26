import { __ } from '@wordpress/i18n';

interface DropdownItems {
    id: string;
    key: number;
    value: string;
    text: string;
}

export const paymentsPaypalConsts = {
	getStarted: {
		heading: __('Get started with PayPal', 'moderntribe-storebuilder'),
		copy: __('Choose an additional card processing method and/or continue to connect your paypal account.', 'moderntribe-storebuilder'),
		label: __('Connect Your Account', 'moderntribe-storebuilder'),
		dropdownLabel: __('PayPal Plans', 'moderntribe-storebuilder'),
		helperText: __('Not sure what plan is right for you?', 'moderntribe-storebuilder'),
		helperLink: __('https://woocommerce.com/products/woocommerce-paypal-payments/', 'moderntribe-storebuilder'),
		helperLinkText: __('See Plan Details.', 'moderntribe-storebuilder'),
		standardPayments: __('Standard Card Processing', 'moderntribe-storebuilder'),
		advancedPayments: __('Advanced Card Processing', 'moderntribe-storebuilder'),
		paypalAlt: __('paypal logo', 'moderntribe-storebuilder')
	},
	accountKeys: {
		heading: __('Your PayPal Account Keys', 'moderntribe-storebuilder'),
		copy: __('Nice! Now that you\'ve activated, we\'ve imported your keys here for you. These keys are specific to your account and will ensure you\'re all set to accept payments on your store.', 'moderntribe-storebuilder'),
		label: __('Your Account Keys', 'moderntribe-storebuilder'),
		liveEmailAddress: __('Live Email Address', 'moderntribe-storebuilder'),
		liveMerchantId: __('Live Merchant ID', 'moderntribe-storebuilder'),
		liveClientId: __('Live Client ID', 'moderntribe-storebuilder'),
		liveClientSecretKey: __('Live Client Secret Key', 'moderntribe-storebuilder')
	},
	success: {
		heading: __('Next Up', 'moderntribe-storebuilder'),
		copy: __('Now that we’re set up, you can further customize your PayPal settings in the PayPal Settings page.', 'moderntribe-storebuilder'),
		nextText: __('Complete', 'moderntribe-storebuilder'),
		manageTitleText: __('Customize PayPal Settings', 'moderntribe-storebuilder'),
		manageBtnText: __('Manage PayPal Payment Settings', 'moderntribe-storebuilder'),
		imageAlt: __('sample checkout page for PayPal', 'moderntribe-storebuilder')
	}
};

export const dropdownItems: DropdownItems[] = [
	{
		id: '0',
		key: 0,
		value: 'standard',
		text: paymentsPaypalConsts.getStarted.standardPayments
	},
	{
		id: '0',
		key: 1,
		value: 'advanced',
		text: paymentsPaypalConsts.getStarted.advancedPayments
	},
];
