import { __ } from '@wordpress/i18n';
import { GO_LIVE_PROPS } from '@sb/constants';
import { Start, VerifyDomain, UpdateSiteUrl, ConnectWithNexcess, FindDomain, ClaimYourDomain } from '../screens';

export interface GoLiveInterface {
	isLoading: boolean;
	verifyingUrl: string;
	lastStep: number;
	hasDomain: string | null;
	selectedDomains: Domain[];
	searchDomain: string;
	skipDnsVerification: boolean;
	verificationStatus: string;
	verificationErrorType: boolean | string;
	verificationMessage: string;
	showLogoutButton: boolean;
	steps: Array<StepInterface>;
	stepsAlternative: Array<StepInterface>;
}

const localData: GoLiveInterface = {
	isLoading: false,
	verifyingUrl: '',
	lastStep: 3,
	hasDomain: null,
	selectedDomains: [],
	searchDomain: '',
	skipDnsVerification: false,
	verificationStatus: 'default',
	verificationErrorType: false,
	verificationMessage: '',
	showLogoutButton: false,
	steps: [
		{
			id: 0,
			label: __('Start', 'moderntribe-sitebuilder'),
			hideBack: true,
			hideSkip: true,
			nextText: __('Continue', 'moderntribe-sitebuilder'),
			loadingText: __('Saving', 'moderntribe-sitebuilder'),
			backText: __('Back', 'moderntribe-sitebuilder'),
			disable: true,
			disableNext: true,
			screen: <Start />,
		},
		{
			id: 1,
			label: __('Verify Domain', 'moderntribe-sitebuilder'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Continue', 'moderntribe-sitebuilder'),
			loadingText: __('Verifying…', 'moderntribe-sitebuilder'),
			backText: __('Back', 'moderntribe-sitebuilder'),
			screen: <VerifyDomain />,
			disable: true,
			disableNext: true,
		},
		{
			id: 2,
			label: __('Update Site URL', 'moderntribe-sitebuilder'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Begin Site URL Update', 'moderntribe-sitebuilder'),
			loadingText: __('Processing', 'moderntribe-sitebuilder'),
			backText: __('Back', 'moderntribe-sitebuilder'),
			screen: <UpdateSiteUrl />,
			disable: true,
			disableNext: false,
		},
	],
	stepsAlternative: [
		{
			id: 0,
			label: __('Start', 'moderntribe-sitebuilder'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Checkout', 'moderntribe-sitebuilder'),
			loadingText: __('Saving', 'moderntribe-sitebuilder'),
			backText: __('Back', 'moderntribe-sitebuilder'),
			disable: true,
			disableNext: true,
			screen: <FindDomain />,
		},
		{
			id: 1,
			label: __('Connect with Nexcess', 'moderntribe-sitebuilder'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Connect Your Nexcess Account', 'moderntribe-sitebuilder'),
			loadingText: __('Connecting…', 'moderntribe-sitebuilder'),
			backText: __('Back', 'moderntribe-sitebuilder'),
			screen: <ConnectWithNexcess />,
			disable: true,
			disableNext: false,
		},
		{
			id: 2,
			label: __('Claim Your Domain', 'moderntribe-sitebuilder'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Save & Exit', 'moderntribe-sitebuilder'),
			loadingText: __('Processing', 'moderntribe-sitebuilder'),
			backText: __('Back', 'moderntribe-sitebuilder'),
			screen: <ClaimYourDomain />,
			disable: true,
			disableNext: false,
		},
	]
};

const goLiveScreenData = (): GoLiveInterface => {
	const serverData = GO_LIVE_PROPS;

	return Object.assign(
		{},
		localData,
		serverData
	);
};

export default goLiveScreenData;
