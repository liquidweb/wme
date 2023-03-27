import { __ } from '@wordpress/i18n';
import { GO_LIVE_PROPS } from '@site/constants';
import { VerifyDomain, UpdateSiteUrl } from '@go-live/domain-connect/screens';

export interface DomainConnectInterface {
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

const localData: DomainConnectInterface = {
	isLoading: false,
	verifyingUrl: '',
	lastStep: 2,
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
			label: __('Verify Domain', 'moderntribe-sitebuilder'),
			hideBack: true,
			hideSkip: true,
			nextText: __('Continue', 'moderntribe-sitebuilder'),
			loadingText: __('Verifying…', 'moderntribe-sitebuilder'),
			backText: __('Back', 'moderntribe-sitebuilder'),
			screen: <VerifyDomain />,
			disable: true,
			disableNext: true,
		},
		{
			id: 1,
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
	]
};

const domainConnectScreenData = (): DomainConnectInterface => {
	const serverData = GO_LIVE_PROPS;

	return Object.assign(
		{},
		localData,
		serverData
	);
};

export default domainConnectScreenData;
