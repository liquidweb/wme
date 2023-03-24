import { JumpNav as WmeJumpNav } from '@moderntribe/wme-ui';
import { Box } from '@mui/material';
import { SetupCardAccordionInterface } from '@sb/setup';
import { useEffect, useState } from 'react';

export interface JumpNavInterface {
	cards: SetupCardAccordionInterface[];
	onItemClick: (index: number) => void;
}

interface JumpNavItemInterface {
	id: string;
	label: string;
	onClick: () => void;
}

const JumpNav = (props: JumpNavInterface) => {
	const { cards, onItemClick } = props;

	const [links, setLinks] = useState<JumpNavItemInterface[]>([]);

	useEffect(() => {
		if (cards && cards.length > 0) {
			setLinks(
				cards.map((card, index) => {
					return {
						id: card.id,
						label: card.navTitle,
						onClick: () => onItemClick(index)
					};
				})
			);
		}
	}, [cards]);

	if (! cards || cards.length === 0) {
		return <div />;
	}

	return (
		<Box sx={ { display: 'flex', justifyContent: 'center' } }>
			<WmeJumpNav title="Jump To:" links={ links } />
		</Box>
	);
};

export { JumpNav };
