import React, { createContext, useState, useEffect } from 'react';
// import { CHANGE_DOMAIN_ACTION, CHANGE_DOMAIN_NONCE, VERIFY_DOMAIN_ACTION, VERIFY_DOMAIN_NONCE, VERIFY_DOMAIN_URL } from '@sb/constants';
import { removeNulls } from '@sb/utils';
import GoLiveData, { GoLiveInterface } from '@sb/wizards/go-live/data/go-live-data';
import { GoLiveStringData } from '@go-live/data/constants';

// TODO: Change out these temp values
const CHANGE_DOMAIN_NONCE = '';
const VERIFY_DOMAIN_NONCE = '';

export interface GoLiveProviderContextInterface {
	goLiveState: GoLiveInterface;
	setGoLiveState: React.Dispatch<React.SetStateAction<GoLiveInterface>>;
	submitGoLiveForm: () => void;
	submitDomainVerification: () => void;
	handleDomainVerificationRequest: () => void;
	setIsLoading: (loading: boolean) => void;
	getHasDomainNextText: (hasDomain: string) => void;
	setHasDomain: (hasDomain: string) => void;
	setShowGetDomain: (show: boolean) => void;
	retryVerificationStep: () => void;
}

const goLiveData = GoLiveData();

export const GoLiveContext = createContext<GoLiveProviderContextInterface | null>(null);

const GoLiveProvider = ({ children }: { children: React.ReactNode }) => {
	const [goLiveState, setGoLiveState] = useState<GoLiveInterface>(goLiveData);
	const { goLiveProviderText: {
		getDomain,
		haveDomain,
		continueStr,
		errorMessage,
		errorMessageVerification,
		errorNotPointed,
		errorNotRegistered,
		errorGeneral
	} } = GoLiveStringData;

	useEffect(() => {
		if (goLiveState.activeStep === 0 && goLiveState.hasDomain !== null) {
			const { steps, activeStep, hasDomain, showGetDomain } = goLiveState;

			steps[ activeStep ].nextText = continueStr;
			steps[ activeStep ].hideBack = true;

			if (hasDomain === 'no') {
				steps[ activeStep ].nextText = showGetDomain ? haveDomain : getDomain;
			}

			if (hasDomain === 'no' && showGetDomain) {
				steps[ activeStep ].disableNext = true;
				steps[ activeStep ].hideBack = false;
			}

			setGoLiveState({
				...goLiveState,
				steps
			});
		}
	}, [goLiveState.activeStep, goLiveState.showGetDomain]);

	const submitGoLiveForm = () => {
		const { steps, activeStep } = goLiveState;
		const handleError = () => {
			// eslint-disable-next-line no-alert
			alert(errorMessage);
		};

		steps[ activeStep ].hideBack = true;

		setGoLiveState({
			...goLiveState,
			steps,
			isLoading: true,
			verificationStatus: 'connecting',
		});

		const data = removeNulls({
			domain: goLiveState.capturedDomain ? goLiveState.capturedDomain : null,
			_mapps_nonce: CHANGE_DOMAIN_NONCE,
		});

		// TODO: update once backend is set up

		// wp.ajax.post(CHANGE_DOMAIN_ACTION, data).fail(() => {
		// 	setGoLiveState({
		// 		...goLiveState,
		// 		isLoading: false,
		// 		verificationStatus: 'default',
		// 	});
		// 	handleError();
		// });
	};

	const submitDomainVerification = () => {
		setGoLiveState({
			...goLiveState,
			isLoading: true,
			hasDomain: 'yes',
			verificationStatus: 'connecting',
			verificationErrorType: false,
			verificationMessage: '',
		});

		handleDomainVerificationRequest();
	};

	const handleDomainVerificationRequest = () => {
		const { steps, activeStep, capturedDomain } = goLiveState;

		const data = removeNulls({
			domain: capturedDomain,
			_mapps_nonce: VERIFY_DOMAIN_NONCE,
		});

		const handleError = () => {
			// eslint-disable-next-line no-alert
			alert(errorMessageVerification);
		};

		// TODO: update once backend is set up

		// wp.ajax.post(VERIFY_DOMAIN_ACTION, data).done((response) => {
		// 	const error = getDomainVerificationError(response);

		// 	if (error) {
		// 		steps[ activeStep ].disableNextButton = true;

		// 		setGoLiveState((previousGoLiveState) => ({
		// 			...previousGoLiveState,
		// 			steps,
		// 			isLoading: false,
		// 			verificationStatus: 'error',
		// 			verificationErrorType: error.type,
		// 			verificationMessage: error.message,
		// 		}));

		// 		return;
		// 	}

		// 	// Successful API check and valid domain.
		// 	steps[ activeStep ].disableNextButton = false;

		// 	setGoLiveState((previousGoLiveState) => ({
		// 		...previousGoLiveState,
		// 		steps,
		// 		isLoading: false,
		// 		verificationStatus: 'connected',
		// 		verificationMessage: '',
		// 		verificationErrorType: false,
		// 	}));
		// }).fail(() => {
		// 	steps[ activeStep ].disableNextButton = true;

		// 	setGoLiveState((previousGoLiveState) => ({
		// 		...previousGoLiveState,
		// 		steps,
		// 		isLoading: false,
		// 		verificationStatus: 'error',
		// 		verificationErrorType: false,
		// 		verificationMessage: '',
		// 	}));

		// 	handleError();
		// });
	};

	// TODO: update response type
	const getDomainVerificationError = (response:any) => {
		// Error: Empty response.
		if (! response || response.length === 0) {
			return {
				type: 'general',
				message: errorGeneral
			};
		}

		// Error: Domain is not registered.
		if (! response?.is_registered) {
			return {
				type: 'registration',
				message: errorNotRegistered
			};
		}

		// Return early if Domain is pointed to this account.
		if (response?.is_pointed) {
			return false;
		}

		// Domain is pointing to Nexcess Nameservers.
		if (response?.uses_local_nameservers) {
			// Error: Domain is not associated with requesting account.
			if (! response?.can_setup) {
				return {
					type: 'general',
					message: errorGeneral
				};
			}

			return false;
		}

		// Error: Domain is not pointed at Nexcess or using Nexcess Nameservers.
		if (! response?.is_pointed || ! response?.uses_local_nameservers) {
			return {
				type: 'pointed',
				message: errorNotPointed
			};
		}

		return false;
	};

	const setIsLoading = (loading:boolean) => {
		setGoLiveState({
			...goLiveState,
			isLoading: loading,
		});
	};

	const getHasDomainNextText = (hasDomain:string) => {
		switch (hasDomain) {
		case 'yes':
			return goLiveState.showGetDomain ? haveDomain : continueStr;
		case 'no':
			return getDomain;
		default:
			return continueStr;
		}
	};

	const setHasDomain = (hasDomain:string) => {
		const { steps, activeStep } = goLiveState;
		steps[ activeStep ].disableNext = hasDomain === null;
		steps[ activeStep ].nextText = getHasDomainNextText(hasDomain);
		setGoLiveState({
			...goLiveState,
			hasDomain,
			steps
		});
	};

	const setShowGetDomain = (show:boolean) => {
		const { steps, activeStep } = goLiveState;
		steps[ activeStep ].nextText = haveDomain;
		setGoLiveState({
			...goLiveState,
			showGetDomain: show,
			steps
		});
	};

	const retryVerificationStep = () => {
		setGoLiveState({
			...goLiveState,
			activeStep: 1,
			isLoading: true,
			hasDomain: 'yes',
			verificationStatus: 'connecting',
			verificationErrorType: false,
			verificationMessage: '',
		});

		handleDomainVerificationRequest();
	};

	return (
		<GoLiveContext.Provider value={ {
			goLiveState,
			setGoLiveState,
			submitGoLiveForm,
			submitDomainVerification,
			setIsLoading,
			setHasDomain,
			setShowGetDomain,
			retryVerificationStep,
			handleDomainVerificationRequest,
			getHasDomainNextText
		} }>
			{ children }
		</GoLiveContext.Provider>
	);
};

export default GoLiveProvider;
