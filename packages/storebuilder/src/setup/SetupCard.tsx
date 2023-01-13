import { __ } from '@wordpress/i18n';
import {
	SetupCardContent,
	SetupCardAccordion
} from '@moderntribe/wme-ui';
import { WatchLater } from '@mui/icons-material';
import { SetupCardFooter, SetupCardLayout } from '@store/setup';
import { useCallback } from 'react';

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

	const getText = useCallback(() => {
		if (completed) {
			return __('Completed', 'moderntribe-storebuilder');
		} else if (chipText) {
			return (
				<span style={ { display: 'flex', alignItems: 'center' } }>
					<span style={ { marginRight: '5px' } }>{ chipText }</span>
					<WatchLater style={ { height: '20px' } } />
				</span>
			);
		}
		return undefined;
	}, [chipText, completed]);

	return (
		<SetupCardAccordion
			id={ id }
			header={ title }
			subHeader={ intro }
			isComplete={ completed }
			chipText={ getText() }
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
