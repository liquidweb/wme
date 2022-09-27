import React from 'react';
import { WizardSectionTitle } from '@stellarwp/wme-ui';

import ScreenWrapper from '@setup/ScreenWrapper';
import { FtcStringData } from '@setup/data/constants';

const { usernamePassword } = FtcStringData;

const StoreLocation = () => {
	return (
		<ScreenWrapper sx={ { maxWidth: 425 } }>
			<WizardSectionTitle
				heading={ usernamePassword.title }
				headingVariant="h2"
			/>
		</ScreenWrapper>
	);
};

export default StoreLocation;
