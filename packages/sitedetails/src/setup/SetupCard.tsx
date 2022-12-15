import { __ } from '@wordpress/i18n';
import { WatchLater, CheckCircle } from '@mui/icons-material';
import {
	Chip,
	SetupCard as WmeSetupCard,
	SetupCardHeader,
	SetupCardContent
} from '@moderntribe/wme-ui';

const SetupCard = (props: SetupCardInterface) => {
	const {
		title = '',
		intro = '',
		time = '',
		completed = false,
	} = props;

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
			<SetupCardContent />
		</WmeSetupCard>
	);
};

export default SetupCard;
