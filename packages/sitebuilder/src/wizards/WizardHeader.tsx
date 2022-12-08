import { WizardHeader as WmeWizardHeader, Logo, ExitButton } from '@moderntribe/wme-ui';
import { useLocation } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { useWizard } from '@sb/hooks';
import { StoreBuilderLogo } from '@sb/logos';
import { ModalDeviceSelection } from '@sb/components';

const EXIT_TEXT = __('Exit to Setup', 'nexcess-mapps');
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
			<>
				<Logo
					width="100"
					logoSrc={ <StoreBuilderLogo /> }
				/>
				{ (location.pathname === '/wizard/look-and-feel') && (currentStep !== 1 && currentStep < 5) ? <ModalDeviceSelection /> : null }
				{
					! hideExit &&
					<ExitButton onClick={ handleExitClick }>
						<span>{ EXIT_TEXT }</span>
					</ExitButton>
				}
			</>
		</WmeWizardHeader>
	);
};

export default WizardHeader;
