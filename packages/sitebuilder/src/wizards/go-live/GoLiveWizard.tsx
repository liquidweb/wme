import React, { useState } from 'react';
import { WizardFooter } from '@stellarwp/wme-ui';
import { useTheme } from '@mui/material';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';
import { useWizard, useGoLive } from '@sb/hooks';
import { NEXCESS_DOMAIN_REGISTRATION_URL } from '@sb/constants';
import { SkipVerificationWarning } from '@go-live/screens';
import WizardCloseWarning from '@sb/wizards/WizardCloseWarning';

const GoLiveWizard = () => {
	const { wizardState: { showCloseWarning }, goToNextStep, goToPreviousStep, goToStep } = useWizard();
	const { goLiveState: { steps, hasDomain, lastStep, showGetDomain, showLogoutButton, verificationStatus }, goLiveState, setShowGetDomain, setGoLiveState, submitGoLiveForm } = useGoLive();
	const [showVerificationWarning, setShowVerificationWarning] = useState<boolean>(false);
	const theme = useTheme();
	const [searchParams] = useSearchParams();
	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	const stepIndex = activeStep >= 1 ? activeStep - 1 : 0;

	const handleNext = () => {
		if (activeStep === 1) {
			if (hasDomain === 'no' && NEXCESS_DOMAIN_REGISTRATION_URL && ! showGetDomain) {
				setShowGetDomain(true);
				return false;
			}
			setGoLiveState({
				...goLiveState,
				hasDomain: 'yes',
				showGetDomain: false,
			});
			goToNextStep();
		}
		if (activeStep === 2 && verificationStatus === 'advanced') {
			setShowVerificationWarning(true);
			return false;
		}
		goToNextStep();
	};

	const handleSkipVerificationWarningClose = () => {
		setShowVerificationWarning(false);
		goToNextStep();
	};

	const handleSkip = () => {
		return null;
	};

	const handleBack = () => {
		if (hasDomain === 'no' && showGetDomain) {
			setShowGetDomain(false);
			return;
		}
		goToPreviousStep();
	};

	const handleSave = () => {
		if (activeStep === lastStep) {
			submitGoLiveForm();
		}
	};

	return (
		<>
			{
				showVerificationWarning && <SkipVerificationWarning
					open={ showVerificationWarning }
					onClose={ () => setShowVerificationWarning(false) }
					save={ handleSkipVerificationWarningClose }
				/>
			}
			{ steps[ stepIndex ].screen }
			<WizardFooter
				sx={ {
					position: 'fixed',
					...(showLogoutButton && {
						'& .WmeWizardFooter-next .WmeWizardFooterNextButton.isLastStep': {
							backgroundColor: theme.palette.primary.main,

							'&:hover': {
								backgroundColor: theme.palette.primary.dark,
							}
						}
					})
				} }
				steps={ steps }
				activeStep={ stepIndex }
				isLastStep={ activeStep === lastStep }
				onBack={ handleBack }
				onNext={ handleNext }
				onSkip={ handleSkip }
				save={ handleSave }
				onClickStep={ ({ id }) => goToStep(id) }
				hideFooter={ false }
				backText={ __('Back', 'nexcess-mapps') }
				skipText={ __('Skip', 'nexcess-mapps') }
				nextText={ steps[ stepIndex ].nextText || __('Next', 'nexcess-mapps') }
			/>
			{ showCloseWarning && <WizardCloseWarning open={ showCloseWarning } /> }
		</>
	);
};

export default GoLiveWizard;
