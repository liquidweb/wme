import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSiteBuilder } from '@sb/hooks';
import { SetupCards } from '@sb/setup';
import { SetupData } from '@sb/setup/data/constants';
const { screen } = SetupData;

const SetupScreen = () => {
	const {
		siteBuilderState: { scrollPosition },
		setScrollPosition
	} = useSiteBuilder();

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
			<Box textAlign="center">{ screen.title }</Box>

			<SetupCards showJumpNav />
		</Box>
	);
};

export default SetupScreen;
