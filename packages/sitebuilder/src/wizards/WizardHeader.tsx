import { WizardHeader as WmeWizardHeader, Logo, ExitButton } from '@moderntribe/wme-ui';
import { useLocation } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { useWizard } from '@sb/hooks';
import { LOGO } from '@sb/constants';
import { ModalDeviceSelection } from '@sb/components';
import { Box } from '@mui/material';

const EXIT_TEXT = __('Exit to Setup', 'moderntribe-sitebuilder');
export interface WizardHeaderInterface {
  hideExit?: boolean;
}

const WizardHeader: React.FC<WizardHeaderInterface> = () => {
	const { wizardState: { showCloseWarning, hideExit }, setShowCloseWarning, closeAll, currentStep } = useWizard();
	const location = useLocation();

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
					width="70px"
					logoSrc={ LOGO }
				/>
				{ (location.pathname === '/wizard/look-and-feel') && (currentStep !== 1 && currentStep < 5) ? <ModalDeviceSelection /> : null }
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
