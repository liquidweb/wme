import { __ } from '@wordpress/i18n';

export const StoreSetupStringData = {
	storeLocation: {
		title: __('Where\'s your store located?', 'nexcess-mapps'),
		copy: __('We need this even if you don\'t have a physical store. Your store address is where you are. We use this to calculate taxes, and we need this for transaction-related emails. It\'s all about being a good store owner.', 'nexcess-mapps'),
		addressLine1Placeholder: __('Your Address', 'nexcess-mapps'),
		addressLine1Label: __('Address line 1', 'nexcess-mapps'),
		addressLine2Label: __('Address line 2 (optional)', 'nexcess-mapps'),
		countryPlaceholder: __('Your Country/Region', 'nexcess-mapps'),
		countryLabel: __('Country/Region', 'nexcess-mapps'),
		statePlaceholder: __('Your State/Province/District', 'nexcess-mapps'),
		cityLabel: __('City', 'nexcess-mapps'),
		postCodeLabel: __('Postcode/Zip', 'nexcess-mapps'),
	},
	storeDetails: {
		title: __('About your store', 'nexcess-mapps'),
	},
	complete: {
		title: __('Nice work! Let\'s keep going.', 'nexcess-mapps'),
		description: __(
			'Nam erat felis, consectetur et velit non, fermentum vulputate sapien. Morbi rhoncus a metus et.',
			'nexcess-mapps'
		),
	},
	submitForm: {
		errorMessage: __('There was an error saving the data.', 'nexcess-mapps'),
	}
};
