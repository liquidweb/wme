import { createContext, useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { handleTelemetryRequest } from '@sb/utils/handleTelemetryRequest';
import { WIZARDS } from '@sb/constants';

export interface ActiveDevice {
	breakpoint: string;
	width: string;
}

export interface WizardProviderStateInterface {
	lastStep: number | null;
	isLastStep: boolean;
	hideExit: boolean;
	showCloseWarning: boolean | null;
	activeDevice: ActiveDevice;
	hasStepped: boolean;
	error?: {
		showError: boolean;
		title?: string;
		message?: string;
	}
}

export interface WizardProviderContextInterface {
	wizardState: WizardProviderStateInterface;
	currentStep: number;
	goToStep: (targetStep: number) => void;
	goToNextStep: () => void;
	goToPreviousStep: () => void;
	closeAll: () => void;
	setShowCloseWarning: (showCloseWarning: boolean) => void;
	setHideExit: (hideExit: boolean) => void;
	setActiveDevice: (device: ActiveDevice) => void;
	setError: (showErrorScreen: boolean, title?: string, message?: string) => void;
}

const initialState: WizardProviderStateInterface = {
	lastStep: null,
	isLastStep: false,
	hideExit: false,
	showCloseWarning: null,
	activeDevice: { breakpoint: 'desktop', width: '100%' },
	hasStepped: false,
	error: {
		showError: true,
	}
};

export const WizardContext =
	createContext<WizardProviderContextInterface | null>(null);

const WizardProvider = ({ children }: { children: React.ReactNode }) => {
	const [wizardState, setWizardState] = useState<WizardProviderStateInterface>(initialState);
	const [searchParams, setSearchParams] = useSearchParams({ step: '1' });
	const currentStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	const navigate = useNavigate();

	const [wizardStarted, setWizardStarted] = useState<boolean>(false);

	const currentWizard = useParams()[ '*' ];

	useEffect(() => {
		if (wizardState.hasStepped) {
			return;
		}
		if (currentStep > 1) {
			setWizardState({
				...wizardState,
				hasStepped: true
			});
		}
	}, [currentStep]);

	useEffect(() => {
		if (currentStep === 1 && ! wizardStarted) {
			let wizardProp = '' as string;
			setWizardStarted(true);

			if (currentWizard?.startsWith('go-live')) {
				wizardProp = 'golive';
			} else {
				wizardProp = currentWizard?.replaceAll('-', '_') as string;
			}

			const nonce = WIZARDS[ wizardProp ]?.ajax.nonce;
			const action = WIZARDS[ wizardProp ]?.ajax.action;

			handleTelemetryRequest(nonce, action);
		}
	}, []);

	const goToStep = (targetStep: number) => {
		if (typeof targetStep !== 'number') {
			return;
		}
		searchParams.set('step', String(targetStep));
		setSearchParams(searchParams);
	};

	const goToNextStep = () => {
		const nextStep = currentStep + 1;
		goToStep(nextStep);
	};

	const goToPreviousStep = () => {
		const nextStep = currentStep ? Number(currentStep) - 1 : 1;
		if (nextStep >= 1) {
			goToStep(nextStep);
		}
	};

	const closeAll = () => {
		navigate('/');
	};

	const setShowCloseWarning = (showCloseWarning: boolean) => {
		setWizardState({
			...wizardState,
			showCloseWarning
		});
	};

	const setHideExit = (hideExit: boolean) => {
		setWizardState({
			...wizardState,
			hideExit
		});
	};

	const setActiveDevice = (device: ActiveDevice) => {
		setWizardState({
			...wizardState,
			activeDevice: device
		});
	};

	const setError = (showErrorScreen: boolean, title?: string, message?: string) => {
		if(!showErrorScreen) {
			setWizardState({
				...wizardState,
				error: undefined
			});
		} else {
			setWizardState({
				...wizardState,
				error: {
					showError: true,
					title: title,
					message: message
				}
			});
		}

	}

	return (
		<WizardContext.Provider
			value={ {
				wizardState,
				currentStep,
				goToStep,
				goToNextStep,
				goToPreviousStep,
				closeAll,
				setShowCloseWarning,
				setHideExit,
				setActiveDevice,
				setError
			} }
		>
			{ children }
		</WizardContext.Provider>
	);
};

export default WizardProvider;
