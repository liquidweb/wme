import { useState } from 'react';
import { JumpNav } from '@moderntribe/wme-ui';
import { CARDS } from '@sb/constants';

export function useJumpNav() {
	const url = window.location.href;

	const [links] = useState(
		CARDS.map((card) => ({
			id: card.id,
			label: card.title,
			href: `${ url.replace('/#', '') }#/wizard/${ card.slug }`,
			remainingTasks: card.rows.length
		}))
	);

	return {
		JumpNav,
		links
	};
}
