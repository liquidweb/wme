import React from 'react';
import { WizardHeader as WmeWizardHeader, Logo, ExitButton } from '@stellarwp/wme-ui';
import { Routes, Route } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { useWizard } from '@sb/hooks';
import { SiteBuilderLogo } from '@sb/logos';
import { ModalDeviceSelection } from '@sb/components';

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
					logoSrc={ <SiteBuilderLogo /> }
				/>
				<Routes>
					<Route path="/look-and-feel" element={ <ModalDeviceSelection /> } />
				</Routes>
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
