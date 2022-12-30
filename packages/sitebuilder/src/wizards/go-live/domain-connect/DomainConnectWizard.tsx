import { useState } from 'react';
import { WizardFooter } from '@moderntribe/wme-ui';
import { useTheme } from '@mui/material';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';
import { useWizard, useGoLive, useCreatePurchaseFlow } from '@sb/hooks';
import { SkipVerificationWarning } from '@go-live/screens';
import WizardCloseWarning from '@sb/wizards/WizardCloseWarning';

const DomainConnectWizard = () => {
	const { wizardState: { showCloseWarning }, goToNextStep, goToPreviousStep, goToStep } = useWizard();
	const {
		goLiveState: {
			steps: stepsOriginal,
			hasDomain,
			lastStep,
			showLogoutButton,
			verificationStatus
		}, setShowPurchaseNavigation, submitGoLiveForm
	} = useGoLive();
	const [showVerificationWarning, setShowVerificationWarning] = useState<boolean>(false);
	const theme = useTheme();
	const createPurchaseFlow = useCreatePurchaseFlow();
	const [searchParams] = useSearchParams();
	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	const purchaseNavigation = searchParams.get('purchase') === 'true';
	const stepIndex = activeStep >= 1 ? activeStep - 1 : 0;

	const handleNext = () => {
		if (activeStep === 1) {
			if (hasDomain === 'no' && ! purchaseNavigation) {
				return setShowPurchaseNavigation(true);
			}
		}
		if (activeStep === 2) {
			if (verificationStatus === 'advanced') {
				return setShowVerificationWarning(true);
			}
		}
		return goToNextStep();
	};

	const handleSkipVerificationWarningClose = () => {
		setShowVerificationWarning(false);
		goToNextStep();
	};

	const handleSkip = () => {
		return null;
	};

	const handleBack = () => {
		goToPreviousStep();
	};

	const handleSave = () => {
		if (activeStep === lastStep) {
			submitGoLiveForm();
		}
	};

	const steps = stepsOriginal;

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
				backText={ __('Back', 'moderntribe-sitebuilder') }
				skipText={ __('Skip', 'moderntribe-sitebuilder') }
				nextText={ steps[ stepIndex ].nextText || __('Next', 'moderntribe-sitebuilder') }
				loadingText={ steps[ stepIndex ].loadingText || __('Loading', 'moderntribe-sitebuilder') }
				isLoading={ createPurchaseFlow.isLoading }
			/>
			{ showCloseWarning && <WizardCloseWarning open={ showCloseWarning } /> }
		</>
	);
};

export default DomainConnectWizard;
