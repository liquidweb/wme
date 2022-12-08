import { useEffect } from 'react';
import { Box } from '@mui/material';
import { WizardSectionTitle } from '@moderntribe/wme-ui';
import { SetupCards } from '@sb/setup';
import { SetupData } from '@sb/setup/data/constants';
import { StoreBuilderLogo } from '@sb/logos';
import { useSiteBuilder } from '@sb/hooks';

const { screen } = SetupData;

const SetupScreen = () => {
	const { siteBuilderState: { scrollPosition }, setScrollPosition } = useSiteBuilder();

	useEffect(() => {
		window.scrollTo(0, scrollPosition);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
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
};

export default SetupScreen;
