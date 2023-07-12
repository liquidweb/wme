import { __ } from '@wordpress/i18n';

export const FtcStringData = {
	usernamePassword: {
		loginUrlLabelText: __('Your Site URL', 'moderntribe-sitebuilder'),
		loginUrlHelperLink: 'https://www.nexcess.net/storebuilder',
		loginUrlHelperLinkText: __(
			'assign a custom domain to your store.',
			'moderntribe-sitebuilder'
		),
		loginUrlHelperText: __(
			'This is the URL you should go to to work on your site. When you\'re ready to launch you can',
			'moderntribe-sitebuilder'
		),
		siteNameLabelText: __('Site Name', 'moderntribe-sitebuilder'),
		siteNameHelpText: __('What do you want your site to be called? Most templates will display this in the site header.', 'moderntribe-sitebuilder'),
		usernameLabelTextFirst: __('Choose a Username', 'moderntribe-sitebuilder'),
		usernameLabelText: __('Your Username', 'moderntribe-sitebuilder'),
		usernamePlaceholderText: __('Your username', 'moderntribe-sitebuilder'),
		passwordLabelTextFirst: __('Your Password', 'moderntribe-sitebuilder'),
		passwordPlaceholderText: __('6+ characters', 'moderntribe-sitebuilder'),
		setNewPasswordText: __('Set New Password', 'moderntribe-sitebuilder'),
		cancelNewPasswordText: __('Cancel', 'moderntribe-sitebuilder'),
		passwordStatus: {
			weak: __('Weak', 'moderntribe-sitebuilder'),
			medium: __('Medium', 'moderntribe-sitebuilder'),
			strong: __('Strong', 'moderntribe-sitebuilder')
		}
	},
	siteDetails: {
		title: __('Let\'s set up your store', 'moderntribe-sitebuilder'),
		maxFileSize: '20 MB',
		siteTagnameLabelText: __('Tagline', 'moderntribe-sitebuilder'),
		siteTagnamePlaceholderText: __('Just another wordpress site…', 'moderntribe-sitebuilder'),
		siteLogoLabelText: __('Your Logo', 'moderntribe-sitebuilder'),
		siteLogoHelperText: __(
			'Your logo will be displayed in the site header and the site icon. Square and landscape orientations work best.',
			'moderntribe-sitebuilder'
		),
		addLogoButtonText: __('Add Logo', 'moderntribe-sitebuilder'),
		logoMaxText: __('Max', 'moderntribe-sitebuilder'),
		removeButtonText: __('Remove', 'moderntribe-sitebuilder'),
		cancelButtonText: __('Nevermind', 'moderntribe-sitebuilder'),
		uploadedFileAltText: __('Logo', 'moderntribe-sitebuilder'),
		defaultError: __(
			'Something went wrong with the file upload, please try again',
			'moderntribe-sitebuilder'
		),
		goalsSelectText: __('Select all that apply', 'moderntribe-sitebuilder')
	},
	industryDetails: {
		siteSubIndustryText: __('Can you be more specific?', 'moderntribe-sitebuilder'),
		siteSubIndustryPlaceholder: __('Subcategory…', 'moderntribe-sitebuilder'),
	},
	processing: {
		title: __('Nice Choices.', 'moderntribe-sitebuilder'),
		description: __('A wizard is never late, nor are they early, they arrive precisely when they mean to. Give us just a moment as the Wizard summons your template.', 'moderntribe-sitebuilder'),
		statusMessage: __('Importing your colors…', 'moderntribe-sitebuilder'),
	},
	contentTone: {
		title: __('Nice Choices.', 'moderntribe-sitebuilder'),
		description: __(
			'The tone allows the AI to reflect your personality in its communication style. Select a tone that closely aligns with your own.',
			'moderntribe-sitebuilder'),
	},
	keywords: {
		title: __('Add some keywords', 'moderntribe-sitebuilder'),
		description: __('Keywords assist the AI in identifying the most relevant topics to write about.', 'moderntribe-sitebuilder'),
		label: __('Choose your tone', 'moderntribe-sitebuilder'),
		placeholder: __('Add Keywords…', 'moderntribe-sitebuilder'),
		helperText: __('Separate with commas or the Enter key. Enter between 5 and 10 keywords', 'moderntribe-sitebuilder'),
	},
	iAm: {
		placeholder: __('An Individual', 'moderntribe-sitebuilder'),
		label: __('I am', 'moderntribe-sitebuilder'),
	},
	ownerName: {
		label: __('Name', 'moderntribe-sitebuilder'),
		placeholder: __('Your Name', 'moderntribe-sitebuilder'),
	},
	businessLocation: {
		label: __('Where are you based?', 'moderntribe-sitebuilder'),
	},
	industry: {
		text: __('What Industry are you in?', 'moderntribe-sitebuilder'),
		placeholder: __('Industry', 'moderntribe-sitebuilder'),
	},
	siteDescription: {
		label: __('The purpose of my website…', 'moderntribe-sitebuilder'),
		placeholder: __('The purpose of my website is…', 'moderntribe-sitebuilder'),
	},
	customerDescription: {
		label: __('Who are your primary customers or audience?', 'moderntribe-sitebuilder'),
		placeholder: __('My primary audience is…', 'moderntribe-sitebuilder'),
	},
	valueProposition: {
		label: __('What unique value does your business provide?', 'moderntribe-sitebuilder'),
		placeholder: __('What makes this unique is…', 'moderntribe-sitebuilder'),
	},
	productsAndServices: {
		label: __('What key products or services do you offer?', 'moderntribe-sitebuilder'),
		placeholder: __('Your products & services…', 'moderntribe-sitebuilder'),
	},
	usernameValidation: {
		errorMessage: __('There was an error validating your username.', 'moderntribe-sitebuilder'),
	},
	submitForm: {
		errorMessage: __('There was an error saving the data.', 'moderntribe-sitebuilder'),
	},
	errorScreen: {
		title: __('We\'ve ran into an error while doing the thing we were doing.', 'moderntribe-sitebuilder'),
		message: __('To fix this issue you\'ll need to sound the horn of Gondor.', 'moderntribe-sitebuilder'),
		subText: __('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'moderntribe-sitebuilder'),
	}
};
