import React from 'react';
import { __ } from '@wordpress/i18n';
import { GO_LIVE_PROPS } from '@sb/constants';
import { Start, VerifyDomain, UpdateSiteUrl } from '../screens';

export interface GoLiveInterface {
	isLoading: boolean;
	verifyingUrl: string;
	lastStep: number;
	hasDomain: string | null;
	skipDnsVerification: boolean;
	verificationStatus: string;
	verificationErrorType: boolean | string;
	verificationMessage: string;
	showGetDomain: boolean;
	showLogoutButton: boolean;
	steps: Array<StepInterface>;
}

const localData: GoLiveInterface = {
	isLoading: false,
	verifyingUrl: '',
	lastStep: 3,
	hasDomain: null,
	skipDnsVerification: false,
	verificationStatus: 'default',
	verificationErrorType: false,
	verificationMessage: '',
	showGetDomain: false,
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
