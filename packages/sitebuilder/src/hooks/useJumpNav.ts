import { useState } from 'react';
import { JumpNav } from '@moderntribe/wme-ui';
import { CARDS } from '@sb/constants';
import { useNavigate } from 'react-router-dom';
import { GoLiveStatusRowInterface } from '@sb/setup';

export function useJumpNav() {
	const navigate = useNavigate();
	const [links] = useState(
		CARDS.map((card) => {
			const remainingTasks = card.rows.filter(
				(row: SetupCardRowInterface | GoLiveStatusRowInterface) =>
					! row.complete && row.type !== 'launch-domain-status'
			);

			return {
				id: card.id,
				label: card.title,
				onClick: () => navigate(remainingTasks[ 0 ]?.wizardHash || `/wizard/${ card.slug }`),
				remainingTasks: remainingTasks.length
			};
		})
	);

	return {
		JumpNav,
		links
	};
}
