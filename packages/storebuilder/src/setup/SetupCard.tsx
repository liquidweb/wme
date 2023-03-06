import {
	SetupCardContent,
	SetupCardAccordion
} from '@moderntribe/wme-ui';
import { SetupCardFooter, SetupCardLayout } from '@store/setup';

const SetupCard = (props: SetupCardInterface) => {
	const {
		id,
		title = '',
		intro = '',
		rows = [],
		footer,
	} = props;

	return (
		<SetupCardAccordion
			id={ id }
			header={ title }
			subHeader={ intro }
		>
			<SetupCardContent>
				<SetupCardLayout rows={ rows } />
			</SetupCardContent>
			{ footer && <SetupCardFooter footer={ footer } /> }
		</SetupCardAccordion>
	);
};

export default SetupCard;
