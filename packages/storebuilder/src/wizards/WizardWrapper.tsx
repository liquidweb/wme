import React, { lazy } from 'react';
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
	useSearchParams,
} from 'react-router-dom';
import { Wizard } from '@stellarwp/wme-ui';

// Wizard Components.
import WizardHeader from './WizardHeader';
import WizardContent from './WizardContent';
import Loadable from '@store/components/Loadable';

import { getWizardCloseArgs } from '@store/utils';
import { useWizard } from '@store/hooks/useWizard';

// Lazy Wizards.
const StoreSetup = Loadable(lazy(() => import('@setup/StoreSetup')));

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
					<Route path="/store-details" element={ <StoreSetup /> } />
					<Route path="/connect-stripe" element={ <div>STRIPE WIZARD</div> } />
					<Route path="/connect-paypal" element={ <div>PAYPAL WIZARD</div> } />
					<Route path="/shipping" element={ <div>SHIPPING WIZARD</div> } />
					<Route path="*" element={ <Navigate to="/" /> } />
				</Routes>
			</WizardContent>
		</Wizard>
	);
};

export default WizardWrapper;
