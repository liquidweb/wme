import { useEffect } from '@wordpress/element';
import { Box } from '@mui/material';
import { WizardSectionTitle } from '@moderntribe/wme-ui';
import { SetupCards } from '@store/setup';
import { SetupData } from '@store/setup/data/constants';
import { StoreBuilderLogo } from '@store/logos';
import { useStoreBuilder } from '@store/hooks';

const { screen } = SetupData;

const SetupScreen = () => {
	const { storeBuilderState: { scrollPosition }, setScrollPosition } = useStoreBuilder();

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
