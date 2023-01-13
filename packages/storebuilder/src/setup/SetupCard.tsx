import { __ } from '@wordpress/i18n';
import {
	SetupCardContent,
	SetupCardAccordion
} from '@moderntribe/wme-ui';
import { WatchLater } from '@mui/icons-material';
import { SetupCardFooter, SetupCardLayout } from '@store/setup';

const SetupCard = (props: SetupCardInterface) => {
	const {
		id,
		title = '',
		intro = '',
		chipText = '',
		rows = [],
		completed,
		footer,
	} = props;

	// TODO: Start here with the Icon and exampleProducts

	return (
		<SetupCardAccordion
			id={ id }
			header={ title }
			subHeader={ intro }
			isComplete={ completed }
			chipText={ completed ? __('Completed', 'moderntribe-storebuilder') : <span>{ chipText }{ ' ' }<WatchLater /></span> }
			chipBackground={ completed ? 'success' : 'info' }
		>
			<SetupCardContent>
				<SetupCardLayout rows={ rows } />
			</SetupCardContent>
			{ footer && <SetupCardFooter footer={ footer } /> }
		</SetupCardAccordion>
	);
};

export default SetupCard;
