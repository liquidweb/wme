import { SetupCardAccordion, SetupCardContent } from '@moderntribe/wme-ui';
import { SetupCardTasks, SetupCardFooter } from '@sb/setup';

const SetupCard = (props: SetupCardInterface) => {
	const {
		title = '',
		intro = '',
		rows = [],
		footer,
		completed = false,
		id = '',
	} = props;

	return (
		<SetupCardAccordion
			id={ id }
			header={ title }
			subHeader={ intro }
			isComplete={ completed }
			chipText={ `${ rows?.filter((row) => row.type === 'task' && ! row.completed)?.length }` }
			chipBackground="primary"
		>
			<SetupCardContent>
				<SetupCardTasks rows={ rows } />
			</SetupCardContent>
			{ footer && <SetupCardFooter footer={ footer } /> }
		</SetupCardAccordion>
	);
};

export default SetupCard;
