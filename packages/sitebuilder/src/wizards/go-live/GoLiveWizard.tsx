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
	const { goLiveState: { steps: stepsOriginal, stepsAlternative, selectedDomains, hasDomain, lastStep, showLogoutButton, verificationStatus }, setShowPurchaseNavigation, submitGoLiveForm, setGoLiveState } = useGoLive();
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
			if (purchaseNavigation) {
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
			if (purchaseNavigation) {
				setGoLiveState((prevState) => ({
					...prevState,
					selectedDomains: [],
					searchDomain: '',
				}));
				setShowPurchaseNavigation(false);
			}
		}
		goToPreviousStep();
	};

	const handleSave = () => {
		if (activeStep === lastStep) {
			if (purchaseNavigation) {
				closeAll();
			} else {
				submitGoLiveForm();
			}
		}
	};

	const steps = purchaseNavigation ? stepsAlternative : stepsOriginal;

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
