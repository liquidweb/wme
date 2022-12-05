import { __ } from '@wordpress/i18n';

export const GoLiveStringData = {
	goLiveProviderText: {
		getDomain: __('Get My Domain', 'nexcess-mapps'),
		haveDomain: __('I\'ve Got My Domain', 'nexcess-mapps'),
		checkout: __('Checkout', 'nexcess-mapps'),
		continueStr: __('Continue', 'nexcess-mapps'),
		errorMessage: __('There was an error while updating your site\'s domain.', 'nexcess-mapps'),
		errorMessageVerification: __('There was an error while verifying your site\'s domain.', 'nexcess-mapps'),
		errorNotPointed: __('This domain is not pointing to your website.', 'nexcess-mapps'), // TODO: change wording to use product name
		errorNotRegistered: __('This domain is not registered.', 'nexcess-mapps'),
		errorGeneral: __('We\'re unable to connect your domain.', 'nexcess-mapps'),
	},
	start: {
		screenTitle1: __('Set your site domain', 'nexcess-mapps'),
		screenTitle2: __('Find the perfect domain.', 'nexcess-mapps'),
		screenDescription1: __('Let\'s get your site set up with the perfect domain. If you don\'t already have one, don\'t worry - we can help you out.', 'nexcess-mapps'),
		screenDescription2: __('Enter the domain name you want your store to have, and we\'ll see if it\'s available. If it isn\'t, we\'ll make suggestions about ones that are.', 'nexcess-mapps'),
		actionLabel: __('Have you purchased your custom domain?', 'nexcess-mapps'),
		actionTitle1: __('Yes! I have my own custom domain.', 'nexcess-mapps'),
		actionTitle2: __('No, I need one!', 'nexcess-mapps'),
		actionContent1: __('If you have your own domain already then you\'re ready to connect and go live.', 'nexcess-mapps'),
		actionContent2: __('Nexcess will help you find and own your perfect domain name.', 'nexcess-mapps'),
		defaultError: __('Something went wrong, please try again', 'nexcess-mapps')
	},
	verifyDomain: {
		screenTitle: __('Verify your domain', 'nexcess-mapps'),
		screenDescription: __('We\'ll verify your domain and get it ready to use. This can take a while, but don\'t worry - we\'ll walk you through it.', 'nexcess-mapps'),
		screenNotice: __('If you\'re using a subdomain (ex: store.example.com), please stop here and reach out to support at', 'nexcess-mapps'),
		goLiveLabelText: __('Enter the domain you want to connect', 'nexcess-mapps'),
		goLivePlaceholderText: __('yourdomain.com', 'nexcess-mapps'),
		errorDomainFormat: __('The domain entered does not appear to be a valid format.', 'nexcess-mapps'),
	},
	updateSiteUrl: {
		screenTitle: __('You\'re ready to go live with', 'nexcess-mapps'),
		screenDescription: __('Once we begin, this process may take a few minutes. When the process is complete, you will need to log in again on the new live domain', 'nexcess-mapps'),
		launchImgAltText: __('Go live rocket', 'nexcess-mapps'),
		descriptionProcessing: __('This can take a few minutes. You can log out now, or we can will just log out upon completion.', 'nexcess-mapps'),
		loginUrlLabelText: __('Copy Your New Login URL', 'nexcess-mapps'),
		loginUrlHelperText: __('Copy and save this URL. Once your domain is connected you\'ll need it to login.', 'nexcess-mapps')
	},
	connectWithNexcess: {
		screenTitle: __('Good choice! We’ll need to connect to your Nexcess account.', 'nexcess-mapps'),
		screenDescription: __('We\'ll make sure your chosen domain is managed by your Nexcess account. Once connected, we\'ll navigate you back here to complete the process.', 'nexcess-mapps'),
	},
	claimYourDomain: {
		screenTitle: __('is all yours!', 'nexcess-mapps'),
		screenDescription: __('While a new domain is often ready for use within an hour, it can take up to 8 hours to completely process.', 'nexcess-mapps'),
	},
	errorDomainGeneral: {
		accountContent: __('It looks like we\'re having trouble connecting your domain.', 'nexcess-mapps'),
		accountCta: __('Contact Support', 'nexcess-mapps')
	},
	errorDomainNotRegistered: {
		registerDomainContent: __('It looks like this domain is not registered. Don\'t worry, we can help you secure this domain for your Store. Nexcess helps you find, create and own your perfect domain. It’s so easy, even we could do it. Once you\'ve got your domain, come back here and select "I\'ve Got My Domain".', 'nexcess-mapps'),
		registerDomainCtaPart1: __('Purchase', 'nexcess-mapps'),
		registerDomainCtaPart2: __('With Nexcess', 'nexcess-mapps')
	},
	errorDomainRegisteredNotPointing: {
		helpHeadlinePart1: __('1. Enter Name Servers', 'nexcess-mapps'),
		helpHeadlinePart2: __('2. Retry your connection', 'nexcess-mapps'),
		helpHeadlinePart3: __('3. Still not working?', 'nexcess-mapps'),
		helpContentPart1: __('Log in to your domain registrar (the site where you bought your domain) and change the nameservers to the following:', 'nexcess-mapps'),
		helpContentPart1a: __('If you don\'t know how to do this, your registrar\'s customer support team can help!', 'nexcess-mapps'),
		helpContentPart1b: __('Advanced users only: If you\'d prefer to point A records or CNAME records to your StoreBuilder site, you can log into the Nexcess Client Portal to find the settings for your site.', 'nexcess-mapps'),
		helpContentPart1c: __('Learn more about connecting a domain.', 'nexcess-mapps'),
		helpContentPart2: __('Once you\'ve pointed your Name Servers at Nexcess you can retry your connection. It can take up to 48 hours for this to work.', 'nexcess-mapps'),
		helpContentPart3: __('This can take awhile, depending on your provider. If it\'s been 48 hours since you added your nameservers, contact StoreBuilder support for further assistance. ', 'nexcess-mapps'),
		retryConnection: __('Retry connection', 'nexcess-mapps'),
		advancedLabelPart1: __('Advanced:', 'nexcess-mapps'),
		advancedLabelPart2: __('Skip verification', 'nexcess-mapps'),
		advancedContentPart1: __('By default, we check that the appropriate DNS records are set before changing your domain. If you\'re behind a proxy or are using another more advanced DNS technique, you may wish to skip this validation.', 'nexcess-mapps'),
		advancedContentPart2: __('Your site may become inaccessible if its DNS records are invalid, so please double-check your DNS configuration before continuing.', 'nexcess-mapps'),
		advancedContentPart3: __('If anything does go wrong, please reach out to support and we\'ll get you up and running!', 'nexcess-mapps'),
	},
	successDomainConnected: {
		statusSuccessPart1: __('Your domain is ready to connect!', 'nexcess-mapps'),
		statusSuccessPart2: __('Continue and we\'ll do all the work of updating your site to use your custom domain.', 'nexcess-mapps'),
		statusSuccessNote: __('This process may take a few minutes, after which you will need to log in again on the new live domain.', 'nexcess-mapps')
	},
	skipVerificationWarning: {
		warningHeadline: __('Skipping domain verification is an advanced step.', 'nexcess-mapps'),
		message1: __('Your site may become inaccessible if its domain records are invalid, so please double-check your configuration before continuing.', 'nexcess-mapps'),
		message2: __('If anything does go wrong, please reach out to support and we\'ll get you up and running!', 'nexcess-mapps'),
		continueButton: __('Continue without verification', 'nexcess-mapps'),
		nevermind: __('Do not skip verification', 'nexcess-mapps')
	},
	domainItems: {
		taken: __('Taken', 'nexcess-mapps'),
		selected: __('Selected', 'nexcess-mapps'),
		available: __('Available', 'nexcess-mapps'),
	}
};
