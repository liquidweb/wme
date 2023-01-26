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
		usernameLabelTextFirst: __('Choose a Username', 'moderntribe-sitebuilder'),
		usernameLabelText: __('Username', 'moderntribe-sitebuilder'),
		usernamePlaceholderText: __('Your Username…', 'moderntribe-sitebuilder'),
		passwordLabelTextFirst: __('Your Password', 'moderntribe-sitebuilder'),
		passwordPlaceholderText: __('Your Password…', 'moderntribe-sitebuilder'),
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
		siteTagnamePlaceholderText: __(
			'Tell us a bit about your store',
			'moderntribe-sitebuilder'
		),
		siteTaglineHelperText: __(
			'Use a (short) tagline to tell visitors more about what makes your site unique.',
			'moderntribe-sitebuilder'
		),
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
		)
	},
	industryDetails: {
		businessDescriptionLabel: __('What\'s your mission statement?', 'moderntribe-sitebuilder'),
		businessDescriptionPlaceholder: __('My business is…', 'moderntribe-sitebuilder'),
		personalityLabel: __('Describe your personality', 'moderntribe-sitebuilder'),
		siteIndustryText: __('What Industry are you in?', 'moderntribe-sitebuilder'),
		siteIndustryPlaceholder: __('Category…', 'moderntribe-sitebuilder'),
		siteSubIndustryText: __('Can you be more specific?', 'moderntribe-sitebuilder'),
		siteSubIndustryPlaceholder: __('Subcategory…', 'moderntribe-sitebuilder'),
	},
	complete: {
		title: __('Nice work! Let\'s keep going.', 'moderntribe-sitebuilder'),
		description: __(
			'Save and Continue to configure your site\'s design, payment options, shipping and more.',
			'moderntribe-sitebuilder'
		),
		imgSrc: '',
		designStepTitleText: __('Next up: Design your Site', 'moderntribe-sitebuilder'),
		designStepButtonText: __('Go to Step 2: Design', 'moderntribe-sitebuilder'),
		poweredByText: __('Powered by', 'moderntribe-sitebuilder'),
		sidebarImgSrc: ''
	},
	usernameValidation: {
		errorMessage: __('There was an error validating your username.', 'moderntribe-sitebuilder'),
	},
	submitForm: {
		errorMessage: __('There was an error saving the data.', 'moderntribe-sitebuilder'),
	}
};
