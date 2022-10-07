import React from 'react';
import StoreSetupWizard from '@setup/StoreSetupWizard';
import StoreSetupProvider from '@store/contexts/StoreSetupProvider';

const StoreSetup = () => (
	<StoreSetupProvider>
		<StoreSetupWizard />
	</StoreSetupProvider>
);

export default StoreSetup;
