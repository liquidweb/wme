import React from 'react';
import { Box } from '@mui/material';
import { WizardSectionTitle } from '@stellarwp/wme-ui';

import { SetupCards } from '@sb/setup';
import { SetupData } from '@sb/setup/data/constants';

const { screen } = SetupData;

const SetupScreen = () => (
	<Box pt={ 2 }>
		<WizardSectionTitle
			heading={ screen.title }
			headingVariant="h1"
			copy={ screen.intro }
			copyVariant="body2"
			bookend
		/>
		<SetupCards />
	</Box>
);

export default SetupScreen;
