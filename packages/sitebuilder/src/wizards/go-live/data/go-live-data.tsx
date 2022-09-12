import React from 'react';
import { __ } from '@wordpress/i18n';

import { Start, VerifyDomain, UpdateSiteUrl } from '../screens';

export interface GoLiveStep {
	id: number;
	hideBack?: boolean;
	hideSkip?: boolean;
	hideNext?: boolean;
	label?: string;
	nextText?: string;
	loadingText?: string;
	backText?: string;
	screen?: React.ReactNode;
	disableNext?: boolean;
	disableAll?: boolean;
	disable?: boolean;
  }

export interface GoLiveInterface {
	isLoading: boolean;
	capturedDomain: string;
	activeStep: number;
	hasDomain: string | null;
	skipDnsVerification: boolean;
	verificationStatus: string;
	verificationErrorType: boolean | string;
	verificationMessage: string;
	showGetDomain: boolean;
    steps: Array<GoLiveStep>;
}

const goLiveScreenData = (): GoLiveInterface => ({
	isLoading: false,
	capturedDomain: '', // TODO: replace with URL from backend
	activeStep: 0,
	hasDomain: null,
	skipDnsVerification: false,
	verificationStatus: 'default',
	verificationErrorType: false,
	verificationMessage: '',
	showGetDomain: false,
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
});

export default goLiveScreenData;
