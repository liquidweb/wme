import { useEffect } from 'react';
import { Box } from '@mui/material';
import { SetupCards } from '@sb/setup';
import { DetailsHeader } from '@sb/components';
import { useSiteBuilder, useJumpNav } from '@sb/hooks';

const SetupScreen = () => {
	const { siteBuilderState: { scrollPosition }, setScrollPosition } = useSiteBuilder();
	const { JumpNav, links } = useJumpNav();

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
			<Box sx={ { maxWidth: '800px', margin: 'auto' } }>
				<JumpNav title="Jump To:" links={ links } />
				<SetupCards />
			</Box>
		</Box>
	);
};

export default SetupScreen;
