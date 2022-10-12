import { __ } from '@wordpress/i18n';

interface DropdownItems {
    id: string;
    key: number;
    value: string;
    text: string;
}

export const paymentsPaypalConsts = {
	getStarted: {
		heading: __('Get started with PayPal', 'nexcess-mapps'),
		copy: __('Choose an additional card processing method and/or continue to connect your paypal account.', 'nexcess-mapps'),
		label: __('Connect Your Account', 'nexcess-mapps'),
		dropdownLabel: __('PayPal Plans', 'nexcess-mapps'),
		helperText: __('Not sure what plan is right for you? See Plan Details.', 'nexcess-mapps'),
		standardPayments: __('Standard Card Processing', 'nexcess-mapps'),
		advancedPayments: __('Advanced Card Processing', 'nexcess-mapps'),
		paypalAlt: __('paypal logo', 'nexcess-mapps')
	},
	accountKeys: {
		heading: __('Your PayPal Account Keys', 'nexcess-mapps'),
		copy: __('Nice! Now that you\'ve activated, we\'ve imported your keys here for you. These keys are specific to your account and will ensure you\'re all set to accept payments on your store.', 'nexcess-mapps'),
		label: __('Your Account Keys', 'nexcess-mapps'),
		liveEmailAddress: __('Live Email Address', 'nexcess-mapps'),
		liveMerchantId: __('Live Merchant ID', 'nexcess-mapps'),
		liveClientId: __('Live Client ID', 'nexcess-mapps'),
		liveClientSecretKey: __('Live Client Secret Key', 'nexcess-mapps')
	},
	success: {
		heading: __('You\'re ready to accept PayPal Payments on your Store!', 'nexcess-mapps'),
		copy: __('That was easy. Your PayPal account is connected. If you\'d like you can customize your PayPal settings further in the WordPress Admin.', 'nexcess-mapps'),
		nextText: __('Complete', 'nexcess-mapps'),
		manageTitleText: __('Customize PayPal Settings', 'nexcess-mapps'),
		manageBtnText: __('PayPal Payment Settings', 'nexcess-mapps'),
		imageAlt: __('sample checkout page for PayPal', 'nexcess-mapps')
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
