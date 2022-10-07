import React from 'react';
import { Box } from '@mui/material';
import { WizardSectionTitle } from '@stellarwp/wme-ui';
import { SetupCards } from '@store/setup';
import { SetupData } from '@store/setup/data/constants';
import { StoreBuilderLogo } from '@store/logos';

const { screen } = SetupData;

const SetupScreen = () => (
	<Box pt={ 3 } pl={ '12px' } pr={ 4 }>
		<StoreBuilderLogo />
		<WizardSectionTitle
			heading={ screen.title }
			headingVariant="h1"
			copy={ screen.intro }
			copyVariant="body2"
			bookend
			sx={ { marginTop: 4 } }
		/>
		<SetupCards />
	</Box>
);

export default SetupScreen;
