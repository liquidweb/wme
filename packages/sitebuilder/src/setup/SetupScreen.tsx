import React from 'react';
import { Box } from '@mui/material';
import { WizardSectionTitle } from '@stellarwp/wme-ui';
import { SetupCards } from '@sb/setup';
import { SetupData } from '@sb/setup/data/constants';
import { StoreBuilderLogo } from '@sb/logos';

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
