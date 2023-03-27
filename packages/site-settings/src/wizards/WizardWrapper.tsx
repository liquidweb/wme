import { lazy } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Wizard } from '@moderntribe/wme-ui';

// Wizard Components.
// import WizardHeader from './WizardHeader';
import Loadable from '@site/components/Loadable';

import DomainPurchaseProvider from '@site/contexts/DomainPurchaseProvider';
import DomainConnectProvider from '@site/contexts/DomainConnectProvider';

import { getWizardCloseArgs } from '@site/utils';
import { useWizard } from '@site/hooks/useWizard';

// Lazy Wizards.
const DomainPurchaseWizard = Loadable(lazy(() => import('@go-live/domain-purchase/DomainPurchaseWizard')));
const DomainConnectWizard = Loadable(lazy(() => import('@go-live/domain-connect/DomainConnectWizard')));

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
			<Routes>
				<Route path="/go-live-purchase" element={ <DomainPurchaseProvider><DomainPurchaseWizard /></DomainPurchaseProvider> } />
				<Route path="/go-live-connect" element={ <DomainConnectProvider><DomainConnectWizard /></DomainConnectProvider> } />
				<Route path="*" element={ <Navigate to="/" /> } />
			</Routes>
		</Wizard>
	);
};

export default WizardWrapper;
