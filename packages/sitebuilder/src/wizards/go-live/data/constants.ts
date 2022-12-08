import { __ } from '@wordpress/i18n';

export const GoLiveStringData = {
	goLiveProviderText: {
		getDomain: __('Get My Domain', 'moderntribe-sitebuilder'),
		haveDomain: __('I\'ve Got My Domain', 'moderntribe-sitebuilder'),
    checkout: __('Checkout', 'moderntribe-sitebuilder'),
		continueStr: __('Continue', 'moderntribe-sitebuilder'),
		errorMessage: __('There was an error while updating your site\'s domain.', 'moderntribe-sitebuilder'),
		errorMessageVerification: __('There was an error while verifying your site\'s domain.', 'moderntribe-sitebuilder'),
		errorNotPointed: __('This domain is not pointing to your website.', 'moderntribe-sitebuilder'), // TODO: change wording to use product name
		errorNotRegistered: __('This domain is not registered.', 'moderntribe-sitebuilder'),
		errorGeneral: __('We\'re unable to connect your domain.', 'moderntribe-sitebuilder'),
	},
	start: {
		screenTitle1: __('Set your site domain', 'moderntribe-sitebuilder'),
		screenTitle2: __('Find the perfect domain.', 'moderntribe-sitebuilder'),
		screenDescription1: __('Let\'s get your site set up with the perfect domain. If you don\'t already have one, don\'t worry - we can help you out.', 'moderntribe-sitebuilder'),
		screenDescription2: __('Enter the domain name you want your store to have, and we\'ll see if it\'s available. If it isn\'t, we\'ll make suggestions about ones that are.', 'moderntribe-sitebuilder'),
		actionLabel: __('Have you purchased your custom domain?', 'moderntribe-sitebuilder'),
		actionTitle1: __('Yes! I have my own custom domain.', 'moderntribe-sitebuilder'),
		actionTitle2: __('No, I need one!', 'moderntribe-sitebuilder'),
		actionContent1: __('If you have your own domain already then you\'re ready to connect and go live.', 'moderntribe-sitebuilder),
		actionContent2: __('Nexcess will help you find and own your perfect domain name.', 'moderntribe-sitebuilder'),
		defaultError: __('Something went wrong, please try again', 'moderntribe-sitebuilder')
	},
	verifyDomain: {
		screenTitle: __('Verify your domain', 'moderntribe-sitebuilder'),
		screenDescription: __('We\'ll verify your domain and get it ready to use. This can take a while, but don\'t worry - we\'ll walk you through it.', 'moderntribe-sitebuilder'),
    screenNotice: __('If you\'re using a subdomain (ex: store.example.com), please stop here and reach out to support at', 'moderntribe-sitebuilder'),
		goLiveLabelText: __('Enter the domain you want to connect', 'moderntribe-sitebuilder'),
		goLivePlaceholderText: __('yourdomain.com', 'moderntribe-sitebuilder'),
		errorDomainFormat: __('The domain entered does not appear to be a valid format.', 'moderntribe-sitebuilder')
	},
	updateSiteUrl: {
		screenTitle: __('You\'re ready to go live with', 'moderntribe-sitebuilder'),
		screenDescription: __('Once we begin, this process may take a few minutes. When the process is complete, you will need to log in again on the new live domain', 'moderntribe-sitebuilder'),
		launchImgAltText: __('Go live rocket', 'moderntribe-sitebuilder'),
		descriptionProcessing: __('This can take a few minutes. You can log out now, or we can will just log out upon completion.', 'moderntribe-sitebuilder'),
		loginUrlLabelText: __('Copy Your New Login URL', 'moderntribe-sitebuilder'),
		loginUrlHelperText: __('Copy and save this URL. Once your domain is connected you\'ll need it to login.', 'moderntribe-sitebuilder')
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
		accountContent: __('It looks like we\'re having trouble connecting your domain.', 'moderntribe-sitebuilder'),
		accountCta: __('Contact Support', 'moderntribe-sitebuilder')
	},
	errorDomainNotRegistered: {
		registerDomainContent: __('It looks like this domain is not registered. Don\'t worry, we can help you secure this domain for your Store. Nexcess helps you find, create and own your perfect domain. It’s so easy, even we could do it. Once you\'ve got your domain, come back here and select "I\'ve Got My Domain".', 'moderntribe-sitebuilder'),
		registerDomainCtaPart1: __('Purchase', 'moderntribe-sitebuilder'),
		registerDomainCtaPart2: __('With Nexcess', 'moderntribe-sitebuilder')
	},
	errorDomainRegisteredNotPointing: {
		helpHeadlinePart1: __('1. Enter Name Servers', 'moderntribe-sitebuilder'),
		helpHeadlinePart2: __('2. Retry your connection', 'moderntribe-sitebuilder'),
		helpHeadlinePart3: __('3. Still not working?', 'moderntribe-sitebuilder'),
		helpContentPart1: __('Log in to your domain registrar (the site where you bought your domain) and change the nameservers to the following:', 'moderntribe-sitebuilder'),
		helpContentPart1a: __('If you don\'t know how to do this, your registrar\'s customer support team can help!', 'moderntribe-sitebuilder'),
		helpContentPart1b: __('Advanced users only: If you\'d prefer to point A records or CNAME records to your StoreBuilder site, you can log into the Nexcess Client Portal to find the settings for your site.', 'moderntribe-sitebuilder'),
		helpContentPart1c: __('Learn more about connecting a domain.', 'moderntribe-sitebuilder'),
		helpContentPart2: __('Once you\'ve pointed your Name Servers at Nexcess you can retry your connection. It can take up to 48 hours for this to work.', 'moderntribe-sitebuilder'),
		helpContentPart3: __('This can take awhile, depending on your provider. If it\'s been 48 hours since you added your nameservers, contact StoreBuilder support for further assistance. ', 'moderntribe-sitebuilder'),
		retryConnection: __('Retry connection', 'moderntribe-sitebuilder'),
		advancedLabelPart1: __('Advanced:', 'moderntribe-sitebuilder'),
		advancedLabelPart2: __('Skip verification', 'moderntribe-sitebuilder'),
		advancedContentPart1: __('By default, we check that the appropriate DNS records are set before changing your domain. If you\'re behind a proxy or are using another more advanced DNS technique, you may wish to skip this validation.', 'moderntribe-sitebuilder'),
		advancedContentPart2: __('Your site may become inaccessible if its DNS records are invalid, so please double-check your DNS configuration before continuing.', 'moderntribe-sitebuilder'),
		advancedContentPart3: __('If anything does go wrong, please reach out to support and we\'ll get you up and running!', 'moderntribe-sitebuilder'),
	},
	successDomainConnected: {
		statusSuccessPart1: __('Your domain is ready to connect!', 'moderntribe-sitebuilder'),
		statusSuccessPart2: __('Continue and we\'ll do all the work of updating your site to use your custom domain.', 'moderntribe-sitebuilder'),
		statusSuccessNote: __('This process may take a few minutes, after which you will need to log in again on the new live domain.', 'moderntribe-sitebuilder')
	},
	skipVerificationWarning: {
		warningHeadline: __('Skipping domain verification is an advanced step.', 'moderntribe-sitebuilder'),
		message1: __('Your site may become inaccessible if its domain records are invalid, so please double-check your configuration before continuing.', 'moderntribe-sitebuilder'),
		message2: __('If anything does go wrong, please reach out to support and we\'ll get you up and running!', 'moderntribe-sitebuilder'),
		continueButton: __('Continue without verification', 'moderntribe-sitebuilder'),
		nevermind: __('Do not skip verification', 'moderntribe-sitebuilder')
	},
	domainItems: {
		taken: __('Taken', 'nexcess-mapps'),
		selected: __('Selected', 'nexcess-mapps'),
		available: __('Available', 'nexcess-mapps')
	}
};
