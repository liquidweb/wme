import { __ } from '@wordpress/i18n';
import { IMAGE_DIR } from '@store/constants';

export const StoreSetupStringData = {
	storeLocation: {
		title: __('Where\'s your store located?', 'nexcess-mapps'),
		copy: __('We need this even if you don\'t have a physical store. Your store address is where you are. We use this to calculate taxes, and we need this for transaction-related emails. It\'s all about being a good store owner.', 'nexcess-mapps'),
		addressLineOnePlaceholder: __('Your Address', 'nexcess-mapps'),
		addressLineOneLabel: __('Address line 1', 'nexcess-mapps'),
		addressLineTwoLabel: __('Address line 2 (optional)', 'nexcess-mapps'),
		countryPlaceholder: __('Your Country/Region', 'nexcess-mapps'),
		countryLabel: __('Country/Region', 'nexcess-mapps'),
		statePlaceholder: __('Your State/Province/District', 'nexcess-mapps'),
		cityLabel: __('City', 'nexcess-mapps'),
		postCodeLabel: __('Postcode/Zip', 'nexcess-mapps')
	},
	storeDetails: {
		title: __('About your store', 'nexcess-mapps'),
		copy: __('Last step! A few more details about your store.', 'nexcess-mapps'),
		currencyLabelText: __('What Currency will you use?', 'nexcess-mapps'),
		currencyPlaceholderText: __('Select', 'nexcess-mapps'),
		currencyHelperText: __('The currency in which your product’s prices will be displayed. You can change this later.', 'nexcess-mapps'),
		productTypesLabelText: __('What types of products are you selling?', 'nexcess-mapps'),
		productTypesHelperText: __('Select all that apply.', 'nexcess-mapps'),
		productCountLabelText: __('How many products do you have?', 'nexcess-mapps')

	},
	complete: {
		title: __('Nice work! Let\'s keep going.', 'nexcess-mapps'),
		copy: __('Next up: Add products and set up your payment method.', 'nexcess-mapps'),
	},
	submitForm: {
		errorMessage: __('There was an error saving the data.', 'nexcess-mapps'),
	}
};

export const productTypeOptions = [
	{
		value: 'physical-goods',
		label: __('Physical Goods', 'nexcess-mapps'),
		icon: `${ IMAGE_DIR }product-type-physical.png`,
		name: 'product_type',
	},
	{
		value: 'digital-goods',
		label: __('Digital Goods', 'nexcess-mapps'),
		icon: `${ IMAGE_DIR }product-type-digital.png`,
		name: 'product_type',
	},
	{
		value: 'services',
		label: __('Services', 'nexcess-mapps'),
		icon: `${ IMAGE_DIR }product-type-services.png`,
		name: 'product_type',
	},
];

export const productCountOptions = [
	{
		value: '1-10',
		label: '1-10',
		icon: `${ IMAGE_DIR }ftc-product-count-1-10.svg`,
		name: 'product_count',
	},
	{
		value: '10-30',
		label: '10-30',
		icon: `${ IMAGE_DIR }ftc-product-count-10-30.svg`,
		name: 'product_count',
	},
	{
		value: '30-99',
		label: '30-99+',
		icon: `${ IMAGE_DIR }ftc-product-count-30-99.svg`,
		name: 'product_count',
	},
];
