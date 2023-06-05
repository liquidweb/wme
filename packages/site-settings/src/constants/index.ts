import { __ } from '@wordpress/i18n';

export const SITE_SETTINGS = window?.site_settings;

export const ASSETS_URL = SITE_SETTINGS?.assets_url;

export const IMAGE_DIR = `${ ASSETS_URL }images/`;

export const UI_THEME = SITE_SETTINGS?.ui_theme;

export const CARDS: SetupCardAccordionInterface[] = SITE_SETTINGS?.cards || [];

export const SITE_VISIBILITY = CARDS?.find((card) => card.id === 'site-visibility');

export const WIZARDS = SITE_SETTINGS?.wizards || {};

export const GO_LIVE_PROPS = SITE_SETTINGS.wizards.golive;

export const NEXCESS_SUPPORT_URL = SITE_SETTINGS.support_url;

export const SITE_DOMAIN_DATA = {
	screen: {
		title: __('Site Set Up', 'moderntribe-sitebuilder'),
	},
	goLiveStatus: {
		manage: __('Manage', 'moderntribe-sitebuilder'),
		statusMessage: __('Your site domain is', 'moderntribe-sitebuilder'),
		tryAgain: __('Try Again', 'moderntribe-sitebuilder'),
		verifyMsgPart1: __('We were unable to verify', 'moderntribe-sitebuilder'),
		verifyMsgPart2: __('Try again in 8-12 hrs after your last attempt.', 'moderntribe-sitebuilder'),
	},
	lookAndFeelFooter: {
		change: __('Change', 'moderntribe-sitebuilder'),
	},
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
	findDomain: {
		title: __('Find the perfect domain.', 'moderntribe-sitebuilder'),
		description: __('Enter the domain name you want your store to have, and we\'ll see if it\'s available. If it isn\'t, we\'ll make suggestions about ones that are.', 'moderntribe-sitebuilder'),
		defaultError: __('Something went wrong, please try again', 'moderntribe-sitebuilder')
	},
	verifyDomain: {
		screenTitle: __('Verify your domain', 'moderntribe-sitebuilder'),
		screenDescription: __('We\'ll verify your domain and get it ready to use. This can take a while, but don\'t worry - we\'ll walk you through it.', 'moderntribe-sitebuilder'),
		screenNotice: __('If you\'re using a subdomain (ex: store.example.com), please stop here and reach out to support at', 'moderntribe-sitebuilder'),
		goLiveLabelText: __('Enter the domain you want to connect', 'moderntribe-sitebuilder'),
		goLivePlaceholderText: __('yourdomain.com', 'moderntribe-sitebuilder'),
		errorDomainFormat: __('The domain entered does not appear to be a valid format.', 'moderntribe-sitebuilder'),
	},
	updateSiteUrl: {
		screenTitle: __('You\'re ready to go live with', 'moderntribe-sitebuilder'),
		screenDescription: __('Once we begin, this process may take a few minutes. When the process is complete, you will need to log in again on the new live domain.', 'moderntribe-sitebuilder'),
		descriptionProcessing: __('This process will take a few minutes. You\'ll be logged out when it completes and will need to log in again on your new domain.', 'moderntribe-sitebuilder'),
		launchImgAltText: __('Go live rocket', 'moderntribe-sitebuilder'),
		loginUrlLabelText: __('Copy Your New Login URL', 'moderntribe-sitebuilder'),
		loginUrlHelperText: __('Copy and save this URL. Once your domain is connected you\'ll need it to login.', 'moderntribe-sitebuilder')
	},
	connectWithNexcess: {
		screenTitle: __('Good choice! We’ll need to connect to your Nexcess account.', 'moderntribe-sitebuilder'),
		screenDescription: __('We\'ll make sure your chosen domain is managed by your Nexcess account. Once connected, we\'ll navigate you back here to complete the process.', 'moderntribe-sitebuilder'),
	},
	claimYourDomain: {
		screenTitle: __('is all yours!', 'moderntribe-sitebuilder'),
		screenDescription: __('We need a little time to update the entire internet about your purchase. You\'ll be able to connect your domain when we\'re done. This typically takes an hour but can take up to 8 hours to complete.', 'moderntribe-sitebuilder'),
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
		taken: __('Taken', 'moderntribe-sitebuilder'),
		selected: __('Selected', 'moderntribe-sitebuilder'),
		available: __('Available', 'moderntribe-sitebuilder'),
		unavailable: __('Unavailable', 'moderntribe-sitebuilder'),
	}
};
