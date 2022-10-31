import React, { useState } from 'react';
import { WizardFooter } from '@moderntribe/wme-ui';
import { useTheme } from '@mui/material';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';
import { useWizard, useGoLive, useCreatePurchaseFlow } from '@sb/hooks';
import { SkipVerificationWarning } from '@go-live/screens';
import WizardCloseWarning from '@sb/wizards/WizardCloseWarning';

const GoLiveWizard = () => {
	const { wizardState: { showCloseWarning }, goToNextStep, goToPreviousStep, goToStep, closeAll } = useWizard();
	const { goLiveState: { steps: stepsOriginal, stepsAlternative, selectedDomains, hasDomain, lastStep, showLogoutButton, verificationStatus }, setShowNexcessNavigation, submitGoLiveForm, setGoLiveState } = useGoLive();
	const [showVerificationWarning, setShowVerificationWarning] = useState<boolean>(false);
	const theme = useTheme();
	const createPurchaseFlow = useCreatePurchaseFlow();
	const [searchParams] = useSearchParams();
	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	const nexcessNavigation = searchParams.get('nexcess') === 'true';
	const stepIndex = activeStep >= 1 ? activeStep - 1 : 0;

	const handleNext = () => {
		if (activeStep === 1) {
			if (hasDomain === 'no' && ! nexcessNavigation) {
				return setShowNexcessNavigation(true);
			}
		}
		if (activeStep === 2) {
			if (verificationStatus === 'advanced') {
				return setShowVerificationWarning(true);
			}
			if (nexcessNavigation) {
				return createPurchaseFlow.mutate(selectedDomains.map((domain) => ({
					domainName: domain.domain,
					packageId: domain.package.id
				})));
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
		if (activeStep === 1) {
			if (nexcessNavigation) {
				setGoLiveState((prevState) => ({
					...prevState,
					selectedDomains: [],
					searchDomain: '',
				}));
				setShowNexcessNavigation(false);
			}
		}
		goToPreviousStep();
	};

	const handleSave = () => {
		if (activeStep === lastStep) {
			if (nexcessNavigation) {
				closeAll();
			} else {
				submitGoLiveForm();
			}
		}
	};

	const steps = nexcessNavigation ? stepsAlternative : stepsOriginal;

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
				loadingText={ steps[ stepIndex ].loadingText || __('Loading', 'nexcess-mapps') }
				isLoading={ createPurchaseFlow.isLoading }
			/>
			{ showCloseWarning && <WizardCloseWarning open={ showCloseWarning } /> }
		</>
	);
};

export default GoLiveWizard;
