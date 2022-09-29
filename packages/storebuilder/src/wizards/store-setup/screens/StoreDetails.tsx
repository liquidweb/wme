import React from 'react';
import { WizardSectionTitle } from '@stellarwp/wme-ui';
import ScreenWrapper from '@setup/ScreenWrapper';
// import { useStoreSetup } from '@store/hooks';
import { StoreSetupStringData } from '@setup/data/constants';

const { storeDetails: {
	title,
	copy
} } = StoreSetupStringData;

const StoreDetails = () => {
	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				heading={ title }
				headingVariant="h2"
				copy={ copy }
			/>
		</ScreenWrapper>
	);
};

export default StoreDetails;
