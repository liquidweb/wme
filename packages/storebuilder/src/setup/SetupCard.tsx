import { __ } from '@wordpress/i18n';
import {
	SetupCard as WmeSetupCard,
	SetupCardHeader,
	SetupCardContent
} from '@moderntribe/wme-ui';
import { SetupCardFooter, SetupCardLayout } from '@store/setup';

const SetupCard = (props: SetupCardInterface) => {
	const {
		title = '',
		intro = '',
		chipText = '',
		rows = [],
		completed,
		footer,
	} = props;

	return (
		<WmeSetupCard>
			<SetupCardHeader
				title={ title }
				subheader={ intro }
				chipBackground={ completed ? 'success' : 'info' }
				chipText={ completed ? __('Completed', 'moderntribe-storebuilder') : chipText }
				isComplete={ completed }
			/>
			<SetupCardContent>
				<SetupCardLayout rows={ rows } />
			</SetupCardContent>
			{ footer && <SetupCardFooter footer={ footer } /> }
		</WmeSetupCard>
	);
};

export default SetupCard;
