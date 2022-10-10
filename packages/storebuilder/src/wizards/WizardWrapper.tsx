import React, { lazy } from 'react';
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
	useSearchParams
} from 'react-router-dom';
import { Wizard } from '@stellarwp/wme-ui';

// Wizard Components.
import WizardHeader from './WizardHeader';
import WizardContent from './WizardContent';
import PaymentsPaypalProvider from '@store/contexts/PaymentsPaypalProvider';
import PaymentsStripeProvider from '@store/contexts/PaymentsStripeProvider';
import Loadable from '@store/components/Loadable';

import { getWizardCloseArgs } from '@store/utils';
import { useWizard } from '@store/hooks/useWizard';

// Lazy Wizards.
const StoreSetup = Loadable(lazy(() => import('@setup/StoreSetup')));
const PaymentsPaypalWizard = Loadable(lazy(() => import('@payments/paypal/PaymentsPaypalWizard')));
const PaymentsStripeWizard = Loadable(lazy(() => import('@payments/stripe/PaymentsStripeWizard')));
const Shipping = Loadable(lazy(() => import('@shipping/Shipping')));

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
		>
			<WizardHeader />
			<WizardContent>
				<Routes>
					<Route path="/store-setup" element={ <StoreSetup /> } />
					<Route path="/payments-paypal" element={ <PaymentsPaypalProvider><PaymentsPaypalWizard /></PaymentsPaypalProvider> } />
					<Route path="/payments-stripe" element={ <PaymentsStripeProvider><PaymentsStripeWizard /></PaymentsStripeProvider> } />
					<Route path="/shipping" element={ <Shipping /> } />
					<Route path="*" element={ <Navigate to="/" /> } />
				</Routes>
			</WizardContent>
		</Wizard>
	);
};

export default WizardWrapper;
