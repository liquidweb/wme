import { __ } from '@wordpress/i18n';

export const FtcStringData = {
	start: {
		title: __('Welcome to StoreBuilder for WordPress!', 'moderntribe-sitebuilder'),
		description: __(
			'Let\'s set up a few basic details about your store. You can skip any of these steps and come back to them later if you\'re not ready to complete them yet.',
			'moderntribe-sitebuilder'
		)
	},
	usernamePassword: {
		title: __('Username & Password', 'moderntribe-sitebuilder'),
		description: __('Welcome to your site! Let’s make it yours by getting you a username and password that\'s unique to you.', 'moderntribe-sitebuilder'),
		loginUrlLabelText: __('Login URL', 'moderntribe-sitebuilder'),
		loginUrlHelperLink: 'https://www.nexcess.net/storebuilder',
		loginUrlHelperLinkText: __(
			'assign a custom domain to your store.',
			'moderntribe-sitebuilder'
		),
		loginUrlHelperText: __(
			'This is the URL you should go to to work on your store. When you\'re ready to launch you can',
			'moderntribe-sitebuilder'
		),
		usernameLabelTextFirst: __('Choose a Username', 'moderntribe-sitebuilder'),
		usernameLabelText: __('Username', 'moderntribe-sitebuilder'),
		usernamePlaceholderText: __('Your Username', 'moderntribe-sitebuilder'),
		passwordLabelTextFirst: __('Choose your own Password', 'moderntribe-sitebuilder'),
		passwordHelperText: __(
			'Passwords must be 6 or more characters in length.',
			'moderntribe-sitebuilder'
		),
		passwordPlaceholderText: __('Your Password', 'moderntribe-sitebuilder'),
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
		siteNameLabelText: __('Site Name', 'moderntribe-sitebuilder'),
		siteNameHelperText: __(
			'What do you want your site to be called? Most templates will display this in the site header.',
			'moderntribe-sitebuilder'
		),
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
