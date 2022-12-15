import { useEffect } from 'react';
import { Box } from '@mui/material';
import { DetailsHeader } from '@sb/components';
import { useSiteBuilder } from '@sb/hooks';
import { SetupCards } from '@sb/setup';

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
			<DetailsHeader />
			<SetupCards showJumpNav />
		</Box>
	);
};

export default SetupScreen;
