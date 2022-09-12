import { __ } from '@wordpress/i18n';

export const lookAndFeelConsts = {
	templateSelection: {
		heading: __('Choose a template', 'nexcess-mapps'),
		text: __('Our set up wizard will help you get the most out of your store.', 'nexcess-mapps'),
		label: __('Choose a template', 'nexcess-mapps'),
	},
	fontSelection: {
		heading: __('Choose a font', 'nexcess-mapps'),
		text: __('Lets pick a starting font, you can always change it later and pick from more options.', 'nexcess-mapps'),
		label: __('Fonts', 'nexcess-mapps'),
	},
	colorSelection: {
		heading: __('Pick some colors', 'nexcess-mapps'),
		text: __('Let’s get you some starting colors. You can always update, expand, and change these later.', 'nexcess-mapps'),
		label: __('Colors', 'nexcess-mapps'),
	},
	importScreen: {
		heading: __('Nice choices', 'nexcess-mapps'),
		text: __('A wizard is never late, nor are they early, they arrive precisely when they mean to. Give us just a moment as the Wizard summons your template.', 'nexcess-mapps'),
		messages: [
			__('Starting import…', 'nexcess-mapps'),
			__('Importing your colors…', 'nexcess-mapps'),
			__('Setting your fonts…', 'nexcess-mapps'),
			__('Building out content…', 'nexcess-mapps'),
			__('Adding images…', 'nexcess-mapps'),
			__('Finishing up your site…', 'nexcess-mapps'),
		],
		finished: __('Site imported successfully!', 'nexcess-mapps'),
		errorMessage: __('Import failed, please try refreshing the page and starting the import again.', 'nexcess-mapps'),
	},
};
