import { createContext, useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { removeNulls, handleActionRequest } from '@moderntribe/wme-utils';
import DomainPurchaseData from '@sb/wizards/go-live/domain-purchase/data/domain-purchase-data';
import { GoLiveStringData } from '@go-live/data/constants';
import { GO_LIVE_PROPS, SITEBUILDER } from '@sb/constants';
import { useSiteBuilder } from '@sb/hooks';

type DomainPurchaseInterface = GoLiveInterface;

const { goLiveProviderText: {
	errorMessage,
} } = GoLiveStringData;

export const DomainPurchaseContext = createContext<Omit<GoLiveProviderContextInterface, 'submitDomainVerification' | 'handleDomainVerificationRequest'> | null>(null);

const DomainPurchaseProvider = ({ children }: { children: React.ReactNode }) => {
	const [goLiveState, setGoLiveState] = useState<DomainPurchaseInterface>(DomainPurchaseData());
	const { selectedDomains } = goLiveState;

	const goLiveNonce = GO_LIVE_PROPS.ajax?.nonce || '';
	const goLiveAction = GO_LIVE_PROPS.ajax?.action || '';

	const { siteBuilderState: { capturedDomain } } = useSiteBuilder();

	const [searchParams, setSearchParams] = useSearchParams();

	const { pathname } = useLocation();
	const purchaseNavigation = pathname.includes('purchase');

	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	useEffect(() => {
		if (activeStep === 1) {
			if (purchaseNavigation) {
				if (selectedDomains.length === 0) {
					searchParams.set('step', '1');
					setSearchParams(searchParams);
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

	const setIsLoading = (loading:boolean) => {
		setGoLiveState({
			...goLiveState,
			isLoading: loading,
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
		<DomainPurchaseContext.Provider value={ {
			goLiveState,
			setGoLiveState,
			submitGoLiveForm,
			setIsLoading,
			setShowPurchaseNavigation,
		} }>
			{ children }
		</DomainPurchaseContext.Provider>
	);
};

export default DomainPurchaseProvider;
