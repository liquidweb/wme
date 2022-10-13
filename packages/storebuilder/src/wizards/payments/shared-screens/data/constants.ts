import { __ } from '@wordpress/i18n';

export const sharedPaymentScreensConst = {
	shared: {
		meltingEmojiAlt: __('melting face emoji', 'nexcess-mapps')
	},
	errorPluginInstall: {
		title: __('We were unable to activate your payment plugin.', 'nexcess-mapps'),
		descriptionPart1: __('We\'ve encountered a problem while attempting to activate your payment plugin. ', 'nexcess-mapps'),
		descriptionPart2: __('Try again.', 'nexcess-mapps'),
		descriptionPart3: __('Still having trouble? We’re here to help: ', 'nexcess-mapps'),
		descriptionPart4: __('Contact Support', 'nexcess-mapps'),
	},
	errorKeys: {
		title: __('Looks like something went wrong.', 'nexcess-mapps'),
		descriptionPart1: __('You\'ll need to go to the ', 'nexcess-mapps'),
		descriptionPart2: __(' Settings ', 'nexcess-mapps'),
		descriptionPart3: __('and update your keys there or contact ', 'nexcess-mapps'),
		descriptionPart4: __(' support.', 'nexcess-mapps')
	}
};
