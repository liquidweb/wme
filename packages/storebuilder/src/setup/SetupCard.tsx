import { __ } from '@wordpress/i18n';
import { WatchLater, CheckCircle } from '@mui/icons-material';
import {
	Chip,
	SetupCard as WmeSetupCard,
	SetupCardHeader,
	SetupCardContent
} from '@moderntribe/wme-ui';
import { useSetupCard } from '@store/hooks';
import { SetupCardLayout, SetupCardFooter } from '@store/setup';

const SetupCard = (props: SetupCardInterface) => {
	const {
		title = '',
		intro = '',
		time = '',
		rows = [],
		footers = [],
		completed = false,
	} = props;

	const { firstRowType, lastRowType } = useSetupCard(props);

	return (
		<WmeSetupCard>
			<SetupCardHeader
				title={ title }
				subheader={ intro }
				action={ time && <Chip
					size="small"
					color={ completed ? 'success' : 'info' }
					icon={ completed ? <CheckCircle /> : <WatchLater /> }
					label={ completed ? __('Completed', 'moderntribe-storebuilder') : time }
				/> }
			/>
			<SetupCardContent sx={ {
				'&.WmeSetupCardContent-root': {
					marginTop: (firstRowType && firstRowType === 'task') ? '16px' : '32px',
					paddingBottom: (lastRowType && lastRowType === 'task') ? '20px' : '32px',
				}
			} }>
				<SetupCardLayout rows={ rows } completed={ completed } />
			</SetupCardContent>
			<SetupCardFooter footers={ footers } />
		</WmeSetupCard>
	);
};

export default SetupCard;
