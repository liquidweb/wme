import { WizardHeader as WmeWizardHeader, Logo, ExitButton } from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import { useWizard } from '@store/hooks';
import { LOGO } from '@store/constants';
import { Box } from '@mui/material';

const EXIT_TEXT = __('Exit to Setup', 'moderntribe-storebuilder');
export interface WizardHeaderInterface {
  hideExit?: boolean;
}

const WizardHeader: React.FC<WizardHeaderInterface> = () => {
	const { wizardState: { showCloseWarning, hideExit }, setShowCloseWarning, closeAll } = useWizard();

	const handleExitClick = () => {
		if (showCloseWarning !== null) {
			setShowCloseWarning(true);
			return;
		}

		closeAll();
	};

	return (
		<WmeWizardHeader>
			<Box sx={ {
				display: 'flex',
				justifyContent: 'space-between',
				width: '100%',
				px: 3
			} }>
				<Logo
					width={ LOGO?.width }
					logoSrc={ LOGO?.src }
				/>
				{
					! hideExit &&
					<ExitButton onClick={ handleExitClick }>
						<span>{ EXIT_TEXT }</span>
					</ExitButton>
				}
			</Box>
		</WmeWizardHeader>
	);
};

export default WizardHeader;
