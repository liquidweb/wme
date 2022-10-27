import React from 'react';
import { __ } from '@wordpress/i18n';
import { GO_LIVE_PROPS } from '@sb/constants';
import { Start, VerifyDomain, UpdateSiteUrl, ConnectWithNexcess, FindDomain } from '../screens';

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
			label: __('Start', 'nexcess-mapps'),
			hideBack: true,
			hideSkip: true,
			nextText: __('Continue', 'nexcess-mapps'),
			loadingText: __('Saving', 'nexcess-mapps'),
			backText: __('Back', 'nexcess-mapps'),
			disable: true,
			disableNext: true,
			screen: <Start />,
		},
		{
			id: 1,
			label: __('Verify Domain', 'nexcess-mapps'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Continue', 'nexcess-mapps'),
			loadingText: __('Verifying…', 'nexcess-mapps'),
			backText: __('Back', 'nexcess-mapps'),
			screen: <VerifyDomain />,
			disable: true,
			disableNext: true,
		},
		{
			id: 2,
			label: __('Update Site URL', 'nexcess-mapps'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Begin Site URL Update', 'nexcess-mapps'),
			loadingText: __('Processing', 'nexcess-mapps'),
			backText: __('Back', 'nexcess-mapps'),
			screen: <UpdateSiteUrl />,
			disable: true,
			disableNext: false,
		},
	],
	stepsAlternative: [
		{
			id: 0,
			label: __('Start', 'nexcess-mapps'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Checkout', 'nexcess-mapps'),
			loadingText: __('Saving', 'nexcess-mapps'),
			backText: __('Back', 'nexcess-mapps'),
			disable: true,
			disableNext: true,
			screen: <FindDomain />,
		},
		{
			id: 1,
			label: __('Connect with Nexcess', 'nexcess-mapps'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Connect Your Nexcess Account', 'nexcess-mapps'),
			loadingText: __('Connecting…', 'nexcess-mapps'),
			backText: __('Back', 'nexcess-mapps'),
			screen: <ConnectWithNexcess />,
			disable: true,
			disableNext: false,
		},
		{
			id: 2,
			label: __('Claim Your Domain', 'nexcess-mapps'),
			hideBack: false,
			hideSkip: true,
			nextText: __('Save & Exit', 'nexcess-mapps'),
			loadingText: __('Processing', 'nexcess-mapps'),
			backText: __('Back', 'nexcess-mapps'),
			screen: <UpdateSiteUrl />,
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
