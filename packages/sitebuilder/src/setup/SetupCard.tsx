import { __ } from '@wordpress/i18n';
import { Chip, SetupCard as WmeSetupCard, SetupCardHeader, SetupCardContent } from '@moderntribe/wme-ui';
import { WatchLater, CheckCircle } from '@mui/icons-material';

import { useSetupCard } from '@sb/hooks';

import { SetupCardTasks, SetupCardFooter } from '@sb/setup';

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
					label={ completed ? __('Completed', 'nexcess-mapps') : time }
				/> }
			/>
			<SetupCardContent sx={ {
				'&.WmeSetupCardContent-root': {
					marginTop: (firstRowType && firstRowType === 'task') ? '16px' : '32px',
					paddingBottom: (lastRowType && lastRowType === 'task') ? '20px' : '32px',
				}
			} }>
				<SetupCardTasks rows={ rows } completed={ completed } />
			</SetupCardContent>
			<SetupCardFooter footers={ footers } />
		</WmeSetupCard>
	);
};

export default SetupCard;
