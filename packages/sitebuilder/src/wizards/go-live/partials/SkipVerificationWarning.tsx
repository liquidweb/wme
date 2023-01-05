import {
	Button,
	Link,
	Dialog,
	DialogContent,
	Typography
} from '@mui/material';
import { IMAGE_DIR } from '@sb/constants';
import { WizardSectionTitle } from '@moderntribe/wme-ui';
import { GoLiveStringData } from '@go-live/data/constants';

const continueButtonSx = {
	mb: 1.5,
	backgroundColor: 'primary.dark',

	'&:hover, &:active': {
		backgroundColor: 'primary.main',
	},
};

export interface SkipVerificationWarningInterface {
	open: boolean;
	onClose: () => void;
	save: () => void;
}

const SkipVerificationWarning: React.FC<SkipVerificationWarningInterface> = (props) => {
	const {
		open,
		onClose,
		save,
	} = props;

	const { skipVerificationWarning: {
		warningHeadline,
		message1,
		message2,
		continueButton,
		nevermind
	} } = GoLiveStringData;

	return (
		<Dialog
			open={ open }
			fullScreen
			sx={ { zIndex: 100000, opacity: '98%' } }
		>
			<DialogContent sx={ {
				maxWidth: '425px',
				width: '100%',
				mx: 'auto',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				overflow: 'hidden',
			} }>
				<WizardSectionTitle
					iconSrc={ `${ IMAGE_DIR }setup-modal-warning.png` }
					heading={ warningHeadline }
					headingVariant={ 'h4' }
					copy={ message1 }
					copyVariant={ 'body2' }
					bookend={ true }
					sx={ {
						'& .WmeWizardSectionTitle-iconContainer': {
							marginBottom: 2,
						},
						'& .WmeWizardSectionTitle-iconContainer img': {
							width: '44px',
							height: '44px',
						}
					} }
				/>
				<Typography variant="body2" sx={ { mb: 3 } }>{ message2 }</Typography>
				<Button
					onClick={ save }
					variant="contained"
					disableElevation
					sx={ continueButtonSx }
				>
					{ continueButton }
				</Button>
				<Link
					component="button"
					variant="body2"
					onClick={ onClose }
					underline="always"
					sx={ { color: 'primary.dark' } }
				>
					{ nevermind }
				</Link>
			</DialogContent>
		</Dialog>
	);
};

export default SkipVerificationWarning;
