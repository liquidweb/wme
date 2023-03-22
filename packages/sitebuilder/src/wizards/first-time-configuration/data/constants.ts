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
		businessDescriptionLabel: __('What\'s your mission statement?', 'moderntribe-sitebuilder'),
		businessDescriptionPlaceholder: __('My business is…', 'moderntribe-sitebuilder'),
		siteIndustryText: __('What Industry are you in?', 'moderntribe-sitebuilder'),
		siteIndustryPlaceholder: __('Category…', 'moderntribe-sitebuilder'),
		siteSubIndustryText: __('Can you be more specific?', 'moderntribe-sitebuilder'),
		siteSubIndustryPlaceholder: __('Subcategory…', 'moderntribe-sitebuilder'),
		personalityLabel: __('Describe your personality', 'moderntribe-sitebuilder'),
		personalityPlaceholder: __('Select an option…', 'moderntribe-sitebuilder'),
		keywordsLabel: __('Keywords', 'moderntribe-sitebuilder'),
		keywordsPlaceholder: __('Blog, tech…', 'moderntribe-sitebuilder'),
		keywordsHelperText: __('Separate each keyword with a comma', 'moderntribe-sitebuilder'),
	},
	processing: {
		title: __('Nice Choices.', 'moderntribe-sitebuilder'),
		description: __('A wizard is never late, nor are they early, they arrive precisely when they mean to. Give us just a moment as the Wizard summons your template.', 'moderntribe-sitebuilder'),
		statusMessage: __('Importing your colors…', 'moderntribe-sitebuilder'),
	},
	usernameValidation: {
		errorMessage: __('There was an error validating your username.', 'moderntribe-sitebuilder'),
	},
	submitForm: {
		errorMessage: __('There was an error saving the data.', 'moderntribe-sitebuilder'),
	}
};
