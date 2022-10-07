import { __ } from '@wordpress/i18n';

export const ShippingStringData = {
	addShippingMethod: {
		title: __('Add a shipping method', 'nexcess-mapps'),
		card1: {
			img: {
				src: 'flat-rate-icon.png',
				full: 'flat-rate-icon-full.png',
				alt: __('Flat Rate Shipping', 'nexcess-mapps')
			},
			title: __('Flat Rate Shipping', 'nexcess-mapps'),
			content: __('Charge a fixed rate of your choosing for shipping.', 'nexcess-mapps'),
			footer: __('Flat Rate Shipping comes free with StoreBuilder.', 'nexcess-mapps'),
		},
		card2: {
			img: {
				src: 'usps-icon.png',
				full: 'usps-icon-full.png',
				alt: __('United States Postal Service', 'nexcess-mapps')
			},
			title: __('USPS Shipping', 'nexcess-mapps'),
			content: __('Easily get shipping rates for your customers from USPS based on address and cart content.', 'nexcess-mapps'),
			footer: __('No Fees. Premium upgrade available.', 'nexcess-mapps'),
		},
	},
	confirmation: {
		title: __('USPS Shipping has been added to your store!', 'nexcess-mapps'),
		descriptionPart1: __('We\'ve added easy access to your USPS settings on the', 'nexcess-mapps'),
		descriptionPart2: __('StoreBuilder Set Up Page', 'nexcess-mapps'),
		descriptionPart3: __('in WordPress. You can start customizing your shipping settings whenever you’re ready.', 'nexcess-mapps')
	},
	error: {
		title: __('We were unable to activate your shipping method.', 'nexcess-mapps'),
		descriptionPart1: __('We\'ve encountered a problem while attempting to activate your shipping method. ', 'nexcess-mapps'),
		descriptionPart2: __('Try again.', 'nexcess-mapps'),
		descriptionPart3: __('Still having trouble? We’re here to help: ', 'nexcess-mapps'),
		descriptionPart4: __('Contact Support', 'nexcess-mapps')
	},
};
