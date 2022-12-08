import { createContext, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { removeNulls, handleActionRequest } from '@moderntribe/wme-utils';
import GoLiveData, { GoLiveInterface } from '@sb/wizards/go-live/data/go-live-data';
import { GoLiveStringData } from '@go-live/data/constants';
import { GO_LIVE_PROPS, SITEBUILDER } from '@sb/constants';
import { useSiteBuilder } from '@sb/hooks';

export interface GoLiveProviderContextInterface {
	goLiveState: GoLiveInterface;
	setGoLiveState: React.Dispatch<React.SetStateAction<GoLiveInterface>>;
	submitGoLiveForm: () => void;
	submitDomainVerification: () => void;
	handleDomainVerificationRequest: () => void;
	setIsLoading: (loading: boolean) => void;
	getHasDomainNextText: (hasDomain: string) => void;
	setHasDomain: (hasDomain: string) => void;
	setShowPurchaseNavigation: (show: boolean) => void;
}

export interface DomainVerficationSuccessInterface {
	domain: string;
	is_registered: boolean;
	is_pointed: boolean;
	uses_local_nameservers: boolean;
	can_setup: boolean;
	nameservers: string[];
}

export interface DomainVerificationErrorInterface {
	code: string;
	message: string;
}

type DomainVerificationResponseType = DomainVerficationSuccessInterface | DomainVerificationErrorInterface;

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

type DomainVerificationResponseTypes = {
	[key in DomainVerificationTypes]: DomainVerificationInterface;
}

const verificationResponse: DomainVerificationResponseTypes = {
	success: {
		type: 'success',
		message: ''
	},
	general: {
		type: 'general',
		message: errorGeneral
	},
	registration: {
		type: 'registration',
		message: errorNotRegistered
	},
	pointed: {
		type: 'pointed',
		message: errorNotPointed
	}
} as const;

export const GoLiveContext = createContext<GoLiveProviderContextInterface | null>(null);

const GoLiveProvider = ({ children }: { children: React.ReactNode }) => {
	const [goLiveState, setGoLiveState] = useState<GoLiveInterface>(GoLiveData());
	const { selectedDomains } = goLiveState;

	const goLiveNonce = GO_LIVE_PROPS.ajax?.nonce || '';
	const goLiveAction = GO_LIVE_PROPS.ajax?.action || '';

	const { siteBuilderState: { capturedDomain } } = useSiteBuilder();

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const purchaseNavigation = searchParams.get('purchase') === 'true';

	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;

	const retryVerification = searchParams.get('retry');

	useEffect(() => {
		if (retryVerification === 'true') {
			submitDomainVerification();
		}
	}, [retryVerification]);

	useEffect(() => {
		if (activeStep === 2) {
			if (purchaseNavigation) {
				if (selectedDomains.length === 0) {
					searchParams.set('step', '1');
					setSearchParams(searchParams);
				}
			}
		}
		if (activeStep === 3) {
			if (! purchaseNavigation) {
				if (! capturedDomain) {
					navigate('/wizard/go-live');
				}

				if (
					goLiveState.verificationStatus && ! (
						goLiveState.verificationStatus === 'connected' ||
					goLiveState.verificationStatus === 'advanced'
					)
				) {
					navigate('/wizard/go-live');
				}

				if (goLiveState.verificationStatus === 'error') {
					navigate('/wizard/go-live?step=2');
				}
			}
		}
	}, [activeStep, purchaseNavigation]);

	const submitGoLiveForm = () => {
		const { steps, showLogoutButton } = goLiveState;
		const handleError = () => {
			// eslint-disable-next-line no-alert
			alert(errorMessage);
		};

		if (showLogoutButton) {
			window.location.assign(SITEBUILDER.logout_url);
			return;
		}

		const previousText = steps[ 2 ].nextText;

		steps[ 2 ].hideBack = true;
		steps[ 2 ].nextText = 'Log Out';

		setGoLiveState({
			...goLiveState,
			steps,
			isLoading: true,
			showLogoutButton: true,
			verificationStatus: 'connecting',
		});

		const data = removeNulls({
			_wpnonce: goLiveNonce,
			action: goLiveAction,
			sub_action: 'finish',
			domain: capturedDomain ? capturedDomain : null,
		});

		handleActionRequest(data).catch(() => {
			steps[ 2 ].nextText = previousText;

			setGoLiveState({
				...goLiveState,
				steps,
				isLoading: false,
				showLogoutButton: false,
				verificationStatus: 'default',
			});
			handleError();
		});
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

	const isDomainVerificationResponse = (response: any): response is DomainVerificationResponseType => {
		return 'code' in response || 'domain' in response;
	};

	const isDomainVerificationSuccess = (response: any): response is DomainVerficationSuccessInterface => {
		return 'domain' in response;
	};

	const isVerificationError = (response: any): response is DomainVerificationInterface => {
		return 'type' in response && 'message' in response && response.type !== 'success';
	};

	const handleDomainVerificationRequest = () => {
		const { steps } = goLiveState;

		const data = removeNulls({
			_wpnonce: goLiveNonce,
			action: goLiveAction,
			sub_action: 'verify-domain',
			domain: capturedDomain,
		});

		const handleError = () => {
			// eslint-disable-next-line no-alert
			alert(errorMessageVerification);
		};

		handleActionRequest(data).then((response) => {
			const error = isDomainVerificationResponse(response)
				? getDomainVerificationError(response)
				: verificationResponse.general;

			steps[ 1 ].disableNext = false;

			if (isVerificationError(error)) {
				steps[ 1 ].disableNext = true;

				setGoLiveState((previousGoLiveState) => ({
					...previousGoLiveState,
					steps,
					isLoading: false,
					verificationStatus: 'error',
					verificationErrorType: error.type,
					verificationMessage: error.message,
				}));

				return;
			}

			setGoLiveState((previousGoLiveState) => ({
				...previousGoLiveState,
				isLoading: false,
				verificationStatus: 'connected',
				verificationMessage: '',
				verificationErrorType: false,
			}));
		}).catch(() => {
			steps[ 1 ].disableNext = true;

			setGoLiveState((previousGoLiveState) => ({
				...previousGoLiveState,
				isLoading: false,
				verificationStatus: 'error',
				verificationErrorType: false,
				verificationMessage: '',
			}));

			handleError();
		}).finally(() => {
			searchParams.delete('retry');
			setSearchParams(searchParams);
		});
	};

	const getDomainVerificationError = (response: DomainVerificationResponseType): DomainVerificationInterface => {
		// Error: Empty response or unexpected response.
		if (! isDomainVerificationSuccess(response)) {
			return verificationResponse.general;
		}

		// Error: Domain is not registered.
		if (! response?.is_registered) {
			return verificationResponse.registration;
		}

		// Return early if Domain is pointed to this account.
		if (response?.is_pointed) {
			return verificationResponse.success;
		}

		// Domain is pointing to Nexcess Nameservers.
		if (response?.uses_local_nameservers) {
			// Error: Domain is not associated with requesting account.
			if (! response?.can_setup) {
				return verificationResponse.general;
			}

			return verificationResponse.success;
		}

		// Error: Domain is not pointed at Nexcess or using Nexcess Nameservers.
		if (! response?.is_pointed || ! response?.uses_local_nameservers) {
			return verificationResponse.pointed;
		}

		return verificationResponse.success;
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
			return haveDomain;
		case 'no':
			return getDomain;
		default:
			return continueStr;
		}
	};

	const setHasDomain = (hasDomain:string) => {
		const { steps } = goLiveState;
		steps[ 0 ].disableNext = hasDomain === null;
		steps[ 0 ].nextText = getHasDomainNextText(hasDomain);
		setGoLiveState({
			...goLiveState,
			hasDomain,
			steps
		});
	};

	const setShowPurchaseNavigation = (show: boolean) => {
		if (show) {
			searchParams.set('purchase', 'true');
		} else {
			searchParams.delete('purchase');
		}
		setSearchParams(searchParams);
	};

	return (
		<GoLiveContext.Provider value={ {
			goLiveState,
			setGoLiveState,
			submitGoLiveForm,
			submitDomainVerification,
			setIsLoading,
			setHasDomain,
			setShowPurchaseNavigation,
			handleDomainVerificationRequest,
			getHasDomainNextText
		} }>
			{ children }
		</GoLiveContext.Provider>
	);
};

export default GoLiveProvider;
