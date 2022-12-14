import { Box } from '@mui/material';
import { SetupCardTasks, SetupCardFooter } from '@sb/setup';
import { CARDS } from '@sb/constants';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { SetupCardAccordion, SetupCardContent } from '@moderntribe/wme-ui';
import { JumpNav } from '@sb/components';

export interface SetupCardAccordionInterface extends SetupCardInterface {
	expanded: boolean;
}

const ACCORDION_TIMEOUT = 150;

const SetupCards = ({ showJumpNav } : { showJumpNav: boolean }) => {
	const listRef = useRef<HTMLElement | null>(null);
	const [cardList, setCardList] = useState<SetupCardAccordionInterface[]>([]);

	useEffect(() => {
		if (CARDS) {
			setCardList(CARDS.map((card) => ({ ...card, expanded: false })));
		}
	}, [CARDS]);

	const scrollToAndOpen = (index: number) => {
		toggleAccordion(cardList[ index ].id, listRef.current?.children?.[ index ]);
	};

	const toggleAccordion = (id?: string, scrollTo?: Element) => {
		flushSync(() => {
			setCardList(
				cardList.map((card) => {
					// If toggle is fired from JumpNav and is already expanded, do not close it
					if (card.id === id) {
						return { ...card, expanded: (! scrollTo || ! card.expanded) ? ! card.expanded : true };
					}
					return card;
				})
			);
		});
		if (scrollTo) {
			setTimeout(() => scrollTo.scrollIntoView({ behavior: 'smooth' }), ACCORDION_TIMEOUT);
		}
	};

	return (
		<Box sx={ { maxWidth: '800px', margin: 'auto' } }>
			{ showJumpNav && <JumpNav cards={ cardList } onItemClick={ scrollToAndOpen } /> }
			<Box mt={ 4 } ref={ listRef }>
				{ cardList.map((card) => (
					<SetupCardAccordion
						expanded={ card.expanded }
						TransitionProps={ { timeout: ACCORDION_TIMEOUT } }
						toggleOpen={ toggleAccordion }
						key={ card.id }
						id={ card.id }
						header={ card.title }
						subHeader={ card.intro }
						isComplete={ card.completed }
						chipText={ `${ card.rows?.filter((row) => row.type === 'task' && ! row.completed)?.length }` }
						chipBackground="primary"
					>
						<SetupCardContent>
							<SetupCardTasks rows={ card.rows } />
						</SetupCardContent>
						{ card.footer && <SetupCardFooter footer={ card.footer } /> }
					</SetupCardAccordion>
				)) }
			</Box>
		</Box>
	);
};

export default SetupCards;
