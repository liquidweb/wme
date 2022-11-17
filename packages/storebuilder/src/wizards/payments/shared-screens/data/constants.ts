import { __ } from '@wordpress/i18n';

export const sharedPaymentScreensConst = {
	shared: {
		meltingEmojiAlt: __('melting face emoji', 'moderntribe-storebuilder')
	},
	errorPluginInstall: {
		title: __('We were unable to activate your payment plugin.', 'moderntribe-storebuilder'),
		descriptionPart1: __('We\'ve encountered a problem while attempting to activate your payment plugin. ', 'moderntribe-storebuilder'),
		descriptionPart2: __('Try again.', 'moderntribe-storebuilder'),
		descriptionPart3: __('Still having trouble? We’re here to help: ', 'moderntribe-storebuilder'),
		descriptionPart4: __('Contact Support', 'moderntribe-storebuilder'),
	},
	errorKeys: {
		title: __('Looks like something went wrong.', 'moderntribe-storebuilder'),
		descriptionPart1: __('You\'ll need to go to the ', 'moderntribe-storebuilder'),
		descriptionPart2: __(' Settings ', 'moderntribe-storebuilder'),
		descriptionPart3: __('and update your keys there or contact ', 'moderntribe-storebuilder'),
		descriptionPart4: __(' support.', 'moderntribe-storebuilder')
	}
};
