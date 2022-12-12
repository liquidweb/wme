import { Box } from '@mui/material';
import { SiteVisibility } from '@store/setup/cards';
import { CARDS } from '@store/constants';

const SetupCards = () => (
	<Box mt={ 4 }>
		{
			CARDS.map((card: SetupCardAccordionInterface) => {
				switch (card.id) {
				case 'site-visibility':
					return <SiteVisibility key={ card.id } { ...card } />;
				case 'google-analytics':
					return <>Analytics</>;
				default:
					return <></>;
				}
			})
		}
	</Box>
);

export default SetupCards;
