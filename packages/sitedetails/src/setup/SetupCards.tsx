import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Box, BoxProps, styled } from '@mui/material';
import { SiteVisibility } from '@store/setup/cards';
import { CARDS } from '@store/constants';
import { JumpNav } from '@moderntribe/wme-ui';

const Container = styled(Box)<BoxProps>(({ theme }) => ({
	maxWidth: theme.spacing(100),
	margin: `${ theme.spacing(3) } auto`,
}));

const Nav = styled(JumpNav)(({ theme }) => ({
	margin: `${ theme.spacing(5) } auto`,
}));

const SetupCards = () => {
	const [cards, setCards] = useState(CARDS);
	const cardData = cards;

	const jumpNavItems = cards.map((card) => ({
		id: card.id,
		label: card.header,
		onClick: () => {
			// Scroll to the target element
			const target = document.getElementById(card.id);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });

				// Expand the target card
				const targetCard = cardData.find((c) => c.id === card.id);
				targetCard.expanded = true;
				setCards([...cardData]);
			}
		}
	}));

	return (
		<Container>
			<Nav
				title={ __('Jump to:', 'moderntribe-storebuilder') }
				links={ jumpNavItems }
			/>
			{
				cards.map((card: SetupCardAccordionInterface) => {
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
		</Container>
	);
};

export default SetupCards;
