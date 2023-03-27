import { __ } from '@wordpress/i18n';
import { GO_LIVE_PROPS } from '@site/constants';
import {
	ConnectWithNexcess,
	FindDomain,
	ClaimYourDomain
} from '@go-live/domain-purchase/screens';

export interface DomainPurchaseInterface {
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
}

const localData: DomainPurchaseInterface = {
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

const domainPurchaseScreenData = (): DomainPurchaseInterface => {
	const serverData = GO_LIVE_PROPS;

	return Object.assign(
		{},
		localData,
		serverData
	);
};

export default domainPurchaseScreenData;
