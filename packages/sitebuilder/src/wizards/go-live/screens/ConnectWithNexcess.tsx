import React from 'react';
import {
	Box
} from '@mui/material';
import { WizardSectionTitle } from '@moderntribe/wme-ui';

const ConnectWithNexcess = () => {
	return (
		<Box sx={ { maxWidth: 505, margin: '0 auto' } }>

			<WizardSectionTitle
				heading={ 'Connect with Nexcess' }
				headingVariant="h2"
				copyVariant="body2"
				sx={ {
					marginBottom: 4,
					textAlign: 'center',
				} }
			/>
		</Box>
	);
};

export default ConnectWithNexcess;
