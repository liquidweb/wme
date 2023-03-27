import { WizardHeader as WmeWizardHeader, Logo, ExitButton } from '@moderntribe/wme-ui';
import { useLocation } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { useWizard } from '@site/hooks';
import { StoreBuilderLogo } from '@site/logos';
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
					width="100"
					logoSrc={ <StoreBuilderLogo /> }
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
