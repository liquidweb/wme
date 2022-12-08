import { __ } from '@wordpress/i18n';
import { IMAGE_DIR } from '@store/constants';

export const StoreSetupStringData = {
	storeLocation: {
		title: __('Where\'s your store located?', 'moderntribe-storebuilder'),
		copy: __('We need this even if you don\'t have a physical store. Your store address is where you are. We use this to calculate taxes, and we need this for transaction-related emails. It\'s all about being a good store owner.', 'moderntribe-storebuilder'),
		addressLineOnePlaceholder: __('Your Address', 'moderntribe-storebuilder'),
		addressLineOneLabel: __('Address line 1', 'moderntribe-storebuilder'),
		addressLineTwoLabel: __('Address line 2 (optional)', 'moderntribe-storebuilder'),
		countryPlaceholder: __('Your Country/Region', 'moderntribe-storebuilder'),
		countryLabel: __('Country/Region', 'moderntribe-storebuilder'),
		statePlaceholder: __('Your State/Province/District', 'moderntribe-storebuilder'),
		cityLabel: __('City', 'moderntribe-storebuilder'),
		postCodeLabel: __('Postcode/Zip', 'moderntribe-storebuilder')
	},
	storeDetails: {
		title: __('About your store', 'moderntribe-storebuilder'),
		copy: __('Last step! A few more details about your store.', 'moderntribe-storebuilder'),
		currencyLabelText: __('What Currency will you use?', 'moderntribe-storebuilder'),
		currencyPlaceholderText: __('Select', 'moderntribe-storebuilder'),
		currencyHelperText: __('The currency in which your product’s prices will be displayed. You can change this later.', 'moderntribe-storebuilder'),
		productTypesLabelText: __('What types of products are you selling?', 'moderntribe-storebuilder'),
		productTypesHelperText: __('Select all that apply.', 'moderntribe-storebuilder'),
		productCountLabelText: __('How many products do you have?', 'moderntribe-storebuilder')
	},
	complete: {
		title: __('Nice work! Let\'s keep going.', 'moderntribe-storebuilder'),
		copy: __('Next up: Add products and set up your payment method.', 'moderntribe-storebuilder')
	},
	submitForm: {
		errorMessage: __('There was an error saving the data.', 'moderntribe-storebuilder')
	}
};

export const productTypeOptions = [
	{
		value: 'physical-goods',
		label: __('Physical Goods', 'moderntribe-storebuilder'),
		icon: `${ IMAGE_DIR }product-type-physical.png`,
		name: 'product_type'
	},
	{
		value: 'digital-goods',
		label: __('Digital Goods', 'moderntribe-storebuilder'),
		icon: `${ IMAGE_DIR }product-type-digital.png`,
		name: 'product_type'
	},
	{
		value: 'services',
		label: __('Services', 'moderntribe-storebuilder'),
		icon: `${ IMAGE_DIR }product-type-services.png`,
		name: 'product_type'
	}
];

export const productCountOptions = [
	{
		value: '1-10',
		label: '1-10',
		icon: `${ IMAGE_DIR }ftc-product-count-1-10.svg`,
		name: 'product_count'
	},
	{
		value: '10-30',
		label: '10-30',
		icon: `${ IMAGE_DIR }ftc-product-count-10-30.svg`,
		name: 'product_count'
	},
	{
		value: '30-99',
		label: '30-99+',
		icon: `${ IMAGE_DIR }ftc-product-count-30-99.svg`,
		name: 'product_count'
	}
];
