import { JumpNav as WmeJumpNav } from '@moderntribe/wme-ui';
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
	remainingTasks: number;
}

const JumpNav = (props: JumpNavInterface) => {
	const { cards, onItemClick } = props;

	const [links, setLinks] = useState<JumpNavItemInterface[]>([]);

	useEffect(() => {
		if (cards && cards.length > 0) {
			setLinks(cards.map((card, index) => {
				const remainingTasks = card.rows?.filter((row) => row.type === 'task' && ! row.completed);

				return {
					id: card.id,
					label: card.navTitle,
					onClick: () => onItemClick(index),
					remainingTasks: remainingTasks.length
				};
			}));
		}
	}, [cards]);

	if (! cards || cards.length === 0) {
		return <div />;
	}

	return (
		<WmeJumpNav title="Jump To:" links={ links } />
	);
};

export { JumpNav };
