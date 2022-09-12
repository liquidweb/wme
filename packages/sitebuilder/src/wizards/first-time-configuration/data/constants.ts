import { __ } from '@wordpress/i18n';

export const FtcStringData = {
	start: {
		title: __('Welcome to SiteBuilder for WordPress!', 'nexcess-mapps'),
		description: __(
			'Let\'s set up a few basic details about your store. You can skip any of these steps and come back to them later if you\'re not ready to complete them yet.',
			'nexcess-mapps'
		)
	},
	usernamePassword: {
		title: __('Username & Password', 'nexcess-mapps'),
		loginUrlLabelText: __('Login URL', 'nexcess-mapps'),
		loginUrlHelperLink: 'https://www.nexcess.net/storebuilder',
		loginUrlHelperLinkText: __(
			'assign a custom domain to your store.',
			'nexcess-mapps'
		),
		loginUrlHelperText: __(
			'This is the URL you should go to to work on your store. When you\'re ready to launch you can',
			'nexcess-mapps'
		),
		usernameLabelTextFirst: __('Choose a Username', 'nexcess-mapps'),
		usernameLabelText: __('Username', 'nexcess-mapps'),
		usernamePlaceholderText: __('Your Username', 'nexcess-mapps'),
		passwordLabelTextFirst: __('Choose your own Password', 'nexcess-mapps'),
		passwordHelperText: __(
			'Passwords must be 6 or more characters in length.',
			'nexcess-mapps'
		),
		passwordPlaceholderText: __('Your Password', 'nexcess-mapps'),
		setNewPasswordText: __('Set New Password', 'nexcess-mapps'),
		cancelNewPasswordText: __('Cancel', 'nexcess-mapps'),
		passwordStatus: {
			weak: __('Weak', 'nexcess-mapps'),
			medium: __('Medium', 'nexcess-mapps'),
			strong: __('Strong', 'nexcess-mapps')
		}
	},
	siteDetails: {
		title: __('Let\'s set up your store', 'nexcess-mapps'),
		maxFileSize: '20 MB',
		siteNameLabelText: __('Site Name', 'nexcess-mapps'),
		siteNameHelperText: __(
			'What do you want your site to be called? Most templates will display this in the site header.',
			'nexcess-mapps'
		),
		siteTagnameLabelText: __('Tagline', 'nexcess-mapps'),
		siteTagnamePlaceholderText: __(
			'Tell us a bit about your store',
			'nexcess-mapps'
		),
		siteTaglineHelperText: __(
			'Use a (short) tagline to tell visitors more about what makes your site unique.',
			'nexcess-mapps'
		),
		siteLogoLabelText: __('Your Logo', 'nexcess-mapps'),
		siteLogoHelperText: __(
			'Your logo will be displayed in the site header and the site icon. Square and landscape orientations work best.',
			'nexcess-mapps'
		),
		addLogoButtonText: __('Add Logo', 'nexcess-mapps'),
		logoMaxText: __('Max', 'nexcess-mapps'),
		removeButtonText: __('Remove', 'nexcess-mapps'),
		cancelButtonText: __('Nevermind', 'nexcess-mapps'),
		uploadedFileAltText: __('Logo', 'nexcess-mapps'),
		defaultError: __(
			'Something went wrong with the file upload, please try again',
			'nexcess-mapps'
		)
	},
	complete: {
		title: __('Nice work! Let\'s keep going.', 'nexcess-mapps'),
		description: __(
			'Save and Continue to configure your site\'s design, payment options, shipping and more.',
			'nexcess-mapps'
		),
		imgSrc: '',
		designStepTitleText: __('Next up: Design your Site', 'nexcess-mapps'),
		designStepButtonText: __('Go to Step 2: Design', 'nexcess-mapps'),
		poweredByText: __('Powered by', 'nexcess-mapps'),
		sidebarImgSrc: ''
	},
	usernameValidation: {
		errorMessage: __('There was an error validating your username.', 'nexcess-mapps'),
	},
	submitForm: {
		errorMessage: __('There was an error saving the data.', 'nexcess-mapps'),
	}
};
