import { __ } from '@wordpress/i18n';

export const lookAndFeelConsts = {
	templateSelection: {
		heading: __('Choose a template', 'moderntribe-sitebuilder'),
		text: __('Our set up wizard will help you get the most out of your store.', 'moderntribe-sitebuilder'),
		label: __('Choose a template', 'moderntribe-sitebuilder'),
	},
	fontSelection: {
		heading: __('Choose a font', 'moderntribe-sitebuilder'),
		text: __('Lets pick a starting font, you can always change it later and pick from more options.', 'moderntribe-sitebuilder'),
		label: __('Fonts', 'moderntribe-sitebuilder'),
	},
	colorSelection: {
		heading: __('Pick some colors', 'moderntribe-sitebuilder'),
		text: __('Let’s get you some starting colors. You can always update, expand, and change these later.', 'moderntribe-sitebuilder'),
		label: __('Colors', 'moderntribe-sitebuilder'),
	},
	importScreen: {
		heading: __('Nice choices', 'moderntribe-sitebuilder'),
		text: __('A wizard is never late, nor are they early, they arrive precisely when they mean to. Give us just a moment as the Wizard summons your template.', 'moderntribe-sitebuilder'),
		messages: [
			__('Starting import…', 'moderntribe-sitebuilder'),
			__('Importing your colors…', 'moderntribe-sitebuilder'),
			__('Setting your fonts…', 'moderntribe-sitebuilder'),
			__('Building out content…', 'moderntribe-sitebuilder'),
			__('Adding images…', 'moderntribe-sitebuilder'),
			__('Finishing up your site…', 'moderntribe-sitebuilder'),
		],
		finished: __('Site imported successfully!', 'moderntribe-sitebuilder'),
		errorMessage: __('Import failed, please try refreshing the page and starting the import again.', 'moderntribe-sitebuilder'),
		paletteAlt: __('paint palette', 'moderntribe-sitebuilder')
	},
	deleteContentWarning: {
		warningHeadline: __('Please Note', 'moderntribe-sitebuilder'),
		message: __('Importing a new starter template will create sample content from your chosen template and replace your site\'s current fonts, colors, widgets and menus.', 'moderntribe-sitebuilder'),
		deleteOption: __('Delete content (pages, posts, products and images) imported by previous template', 'moderntribe-sitebuilder'),
		keepOption: __('Keep previously imported content', 'moderntribe-sitebuilder'),
		importOptions: __('Import options', 'moderntribe-sitebuilder'),
		importButton: __('Import Template', 'moderntribe-sitebuilder'),
		nevermind: __('Never Mind', 'moderntribe-sitebuilder'),
		eyesAlt: __('eyes emoji', 'moderntribe-sitebuilder')
	},
	complete: {
		description: __('You\'re all set! We\'ve updated your site with your choices.', 'moderntribe-sitebuilder'),
		title: __('Nice choices.', 'moderntribe-sitebuilder'),
		designStepTitleText: __('Next Up: Set up your store.', 'moderntribe-sitebuilder'),
		designStepButtonText: __('Get Started', 'moderntribe-sitebuilder')
	}
};
