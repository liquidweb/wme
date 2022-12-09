import { __ } from '@wordpress/i18n';

export const ShippingStringData = {
	addShippingMethod: {
		title: __('Add a shipping method', 'moderntribe-storebuilder'),
		card1: {
			img: {
				src: 'flat-rate-icon.png',
				full: 'flat-rate-icon-full.png',
				alt: __('Flat Rate Shipping', 'moderntribe-storebuilder')
			},
			title: __('Flat Rate Shipping', 'moderntribe-storebuilder'),
			content: __('Charge a fixed rate of your choosing for shipping.', 'moderntribe-storebuilder'),
			footer: __('Flat Rate Shipping comes free with StoreBuilder.', 'moderntribe-storebuilder'),
		},
		card2: {
			img: {
				src: 'usps-icon.png',
				full: 'usps-icon-full.png',
				alt: __('United States Postal Service', 'moderntribe-storebuilder')
			},
			title: __('USPS Shipping', 'moderntribe-storebuilder'),
			content: __('Easily get shipping rates for your customers from USPS based on address and cart content.', 'moderntribe-storebuilder'),
			footer: __('No Fees. Premium upgrade available.', 'moderntribe-storebuilder'),
		},
	},
	confirmation: {
		title: __('USPS Shipping has been added to your store!', 'moderntribe-storebuilder'),
		descriptionPart1: __('We\'ve added easy access to your USPS settings on the', 'moderntribe-storebuilder'),
		descriptionPart2: __('StoreBuilder Set Up Page', 'moderntribe-storebuilder'),
		descriptionPart3: __('in WordPress. You can start customizing your shipping settings whenever you’re ready.', 'moderntribe-storebuilder')
	},
	error: {
		title: __('We were unable to activate your shipping method.', 'moderntribe-storebuilder'),
		descriptionPart1: __('We\'ve encountered a problem while attempting to activate your shipping method. ', 'moderntribe-storebuilder'),
		descriptionPart2: __('Try again.', 'moderntribe-storebuilder'),
		descriptionPart3: __('Still having trouble? We’re here to help: ', 'moderntribe-storebuilder'),
		descriptionPart4: __('Contact Support', 'moderntribe-storebuilder')
	},
	buttonFinish: __('Finish', 'moderntribe-storebuilder'),
	buttonNext: __('Next', 'moderntribe-storebuilder'),
};
