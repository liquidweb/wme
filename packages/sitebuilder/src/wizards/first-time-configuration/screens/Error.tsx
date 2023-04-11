import { Box, Stack, Typography } from '@mui/material';
import { useWizard } from '@sb/hooks';
import { FtcStringData } from '@ftc/data/constants';
import { NotificationOverlay, WizardExitButton } from '@sb/components';
import { __ } from '@wordpress/i18n';
import { Button } from '@moderntribe/wme-ui';
const { errorScreen } = FtcStringData;

export interface ErrorScreenProps {
	logo?: React.ReactNode;
}

const Error = (props: ErrorScreenProps) => {
	const { logo } = props;
	const {
		closeAll,
		wizardState: { error }
	} = useWizard();

	const handleClose = () => {
		closeAll();
	};

	return (
		<NotificationOverlay>
			<WizardExitButton
				onExit={ handleClose }
				text={ __('Exit to Setup', 'moderntribe-sitebuilder') }
			/>
			{ logo && (
				<Box
					sx={ {
						position: 'absolute',
						top: '24px',
						left: '24px',
						zIndex: 999
					} }
				>
					{ logo }
				</Box>
			) }
			<Stack spacing={ 3 } sx={ { maxWidth: '500px' } }>
				<Typography
					variant="h3"
					align="center"
					sx={ { fontWeight: 500 } }
				>
					{ error?.title || errorScreen.title }
				</Typography>
				<Typography variant="body2" align="center">
					{ error?.title || errorScreen.message }
				</Typography>
				<Typography variant="subtext" align="center">
					{ errorScreen.subText }
				</Typography>
			</Stack>
			<Box sx={ { position: 'absolute', bottom: '24px', right: '24px' } }>
				<Button
					variant="contained"
					color="primary"
					onClick={ handleClose }
				>
					Exit
				</Button>
			</Box>
		</NotificationOverlay>
	);
};

export default Error;
