import { JumpNav as WmeJumpNav } from '@moderntribe/wme-ui';
import { SetupCardAccordionInterface } from '@sb/setup';
import { useState } from 'react';

interface JumpNavInterface {
	cards: SetupCardAccordionInterface[];
	onItemClick: (index: number) => void;
}

const JumpNav = (props: JumpNavInterface) => {
	const { cards, onItemClick } = props;

	const [linksWithNav] = useState(
		cards.map((card, index) => {
			const remainingTasks = card.rows?.filter((row) => row.type === 'task' && ! row.completed);

			return {
				id: card.id,
				label: card.navTitle,
				onClick: () => onItemClick(index),
				remainingTasks: remainingTasks.length
			};
		})
	);

	if (! cards || cards.length === 0) {
		return <div />;
	}

	return (
		<WmeJumpNav title="Jump To:" links={ linksWithNav } />
	);
};

export { JumpNav };
