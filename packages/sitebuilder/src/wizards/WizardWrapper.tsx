import React, { lazy } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Wizard } from '@moderntribe/wme-ui';

// Wizard Components.
import WizardHeader from './WizardHeader';
import WizardContent from './WizardContent';
import Loadable from '@sb/constants/components/Loadable';

import LookAndFeelProvider from '@sb/contexts/LookAndFeelProvider';
import GoLiveProvider from '@sb/contexts/GoLiveProvider';

import { getWizardCloseArgs } from '@sb/utils';
import { useWizard } from '@sb/hooks/useWizard';

// Lazy Wizards.
const FtcWizard = Loadable(lazy(() => import('@ftc/FirstTimeConfiguration')));
const GoLiveWizard = Loadable(lazy(() => import('@go-live/GoLiveWizard')));
const LookAndFeelWizard = Loadable(lazy(() => import('@look-and-feel/LookAndFeelWizard')));

const WizardWrapper = () => {
	const { wizardState: { hasStepped }, setShowCloseWarning } = useWizard();
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams({ step: '1' });

	// Handler to respond to Wizard closures triggered by Escape key.
	const handleOnClose = () => {
		const { navigateTo, showCloseWarning } = getWizardCloseArgs(location, Number(searchParams.get('step')), hasStepped);
		if (! showCloseWarning) {
			navigate(navigateTo);
		}
		setShowCloseWarning(showCloseWarning);
	};

	return (
		<Wizard
			open={ true }
			aria-labelledby="sb-modal-title"
			aria-describedby=""
			onClose={ handleOnClose }
			sx={ {
				zIndex: 99999,
				'& .WmeWizard-dialogContent': {
					paddingBottom: (theme) => theme.spacing(4),
				},
			} }
		>
			<WizardHeader />
			<WizardContent>
				<Routes>
					<Route path="/ftc" element={ <FtcWizard /> } />
					<Route path="/look-and-feel" element={ <LookAndFeelProvider><LookAndFeelWizard /></LookAndFeelProvider> } />
					<Route path="/go-live" element={ <GoLiveProvider><GoLiveWizard /></GoLiveProvider> } />
					<Route path="*" element={ <Navigate to="/" /> } />
				</Routes>
			</WizardContent>
		</Wizard>
	);
};

export default WizardWrapper;
