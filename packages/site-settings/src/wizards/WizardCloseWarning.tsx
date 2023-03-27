import { Button, Link, Dialog, DialogContent, Typography } from '@mui/material';
import { __ } from '@wordpress/i18n';

import { useWizard } from '@site/hooks';

export interface WizardModalCloseWarning {
  open: boolean;
}

const exitButtonSx = {
	mb: 1.5,
	backgroundColor: 'primary.dark',

	'&:hover, &:active': {
		backgroundColor: 'primary.main',
	},
};

const warningHeadline = __('You have unsaved changes', 'moderntribe-sitebuilder');
const warningContent = __('Exiting now will discard any unsaved changes. You can resume configuration at any time, but we wanted to let you know.', 'moderntribe-sitebuilder');
const exitButton = __('Exit', 'moderntribe-sitebuilder');
const continueButton = __('Continue Working', 'moderntribe-sitebuilder');
// const WARNING_IMG_ALT_TEXT = __('Caution', 'moderntribe-sitebuilder');

const WizardCloseWarning: React.FC<WizardModalCloseWarning> = (props) => {
	const { open } = props;

	const { closeAll, setShowCloseWarning } = useWizard();

	return <Dialog open={ open } fullScreen sx={ { zIndex: 100000 } }>
		<DialogContent sx={ {
			maxWidth: '400px',
			width: '100%',
			mx: 'auto',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
		} }>
			{ /* <Box
				component="img"
				sx={ {
					width: '44px',
					height: '44px',
					mb: 2,
				} }
				src={ `${ IMAGE_DIR }/setup-modal-warning.png` }
				alt={ WARNING_IMG_ALT_TEXT }
			/> */ }
			<Typography variant="body1" sx={ { fontWeight: 600, mb: 1 } }>{ warningHeadline }</Typography>
			<Typography sx={ { mb: 3 } }>{ warningContent }</Typography>
			<Button
				onClick={ closeAll }
				variant="contained"
				disableElevation
				sx={ exitButtonSx }
			>
				{ exitButton }
			</Button>
			<Link
				component="button"
				variant="body2"
				onClick={ () => setShowCloseWarning(false) }
				underline="always"
				sx={ {
					color: 'primary.dark',
				} }
			>
				{ continueButton }
			</Link>
		</DialogContent>
	</Dialog>;
};

export default WizardCloseWarning;
