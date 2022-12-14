import { Box } from '@mui/material';
import { SetupCardTasks, SetupCardFooter } from '@sb/setup';
import { CARDS } from '@sb/constants';
import { useRef, useState } from 'react';
import { SetupCardAccordion, SetupCardContent } from '@moderntribe/wme-ui';
import { JumpNav } from '@sb/components';

export interface SetupCardAccordionInterface extends SetupCardInterface {
	expanded: boolean;
}

const SetupCards = ({ showJumpNav } : { showJumpNav: boolean }) => {
	const listRef = useRef<HTMLElement | null>(null);
	const [cardList, setCardList] = useState<SetupCardAccordionInterface[]>(CARDS.map((card) => ({ ...card, expanded: false })));

	const scrollToAndOpen = (index: number) => {
		toggleAccordion(cardList[ index ].id);
		listRef.current?.children?.[ index ].scrollIntoView({ behavior: 'smooth' });
	};

	const toggleAccordion = (id?: string) => {
		setCardList(cardList.map((card) => {
			if (card.id === id) {
				return { ...card, expanded: ! card.expanded };
			}
			return card;
		}));
	};

	return (
		<Box sx={ { maxWidth: '800px', margin: 'auto' } } ref={ listRef }>
			{ showJumpNav && (
				<Box mb={ 4 }>
					<JumpNav cards={ cardList } onItemClick={ scrollToAndOpen } />
				</Box>
			) }
			{ cardList.map((card) => (
				<SetupCardAccordion
					expanded={ card.expanded }
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
	);
};

export default SetupCards;
