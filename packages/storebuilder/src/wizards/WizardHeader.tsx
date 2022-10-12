import React from 'react';
import { WizardHeader as WmeWizardHeader, Logo, ExitButton } from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import { useWizard } from '@store/hooks';
import { StoreBuilderLogo } from '@store/logos';

const EXIT_TEXT = __('Exit to Setup', 'nexcess-mapps');
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
			<>
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
			</>
		</WmeWizardHeader>
	);
};

export default WizardHeader;
