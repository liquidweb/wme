import { SetupCardAccordion, SetupCardContent } from '@moderntribe/wme-ui';
import { SetupCardTasks, SetupCardFooter } from '@sb/setup';

const SetupCard = (props: SetupCardInterface) => {
	const {
		title = '',
		intro = '',
		time = '',
		rows = [],
		footers = [],
		completed = false,
		id = '',
	} = props;

	return (
		<SetupCardAccordion
			id={ id }
			header={ title }
			subHeader={ intro }
			isComplete={ completed }
			chipText={ time }
			chipBackground="primary"
		>
			<SetupCardContent>
				<SetupCardTasks rows={ rows } completed={ completed } />
			</SetupCardContent>
			<SetupCardFooter footers={ footers } />
		</SetupCardAccordion>
	);
};

export default SetupCard;
