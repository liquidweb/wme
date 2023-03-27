import { useState } from 'react';
import { WizardFooter } from '@moderntribe/wme-ui';
import { useTheme } from '@mui/material';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';
import { useWizard, useDomainPurchase, useCreatePurchaseFlow } from '@site/hooks';
import { SkipVerificationWarning } from '@go-live/partials';
import WizardCloseWarning from '@site/wizards/WizardCloseWarning';

const DomainPurchaseWizard = () => {
	const {
		wizardState: { showCloseWarning },
		goToNextStep,
		goToPreviousStep,
		goToStep,
		closeAll } = useWizard();
	const {
		goLiveState: {
			steps,
			selectedDomains,
			lastStep,
			showLogoutButton,
			verificationStatus
		},
		setShowPurchaseNavigation,
		setGoLiveState
	} = useDomainPurchase();
	const [showVerificationWarning, setShowVerificationWarning] = useState<boolean>(false);
	const theme = useTheme();
	const createPurchaseFlow = useCreatePurchaseFlow();
	const [searchParams] = useSearchParams();
	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	const stepIndex = activeStep >= 1 ? activeStep - 1 : 0;

	const handleNext = () => {
		if (activeStep === 2) {
			if (verificationStatus === 'advanced') {
				return setShowVerificationWarning(true);
			}
			return createPurchaseFlow.mutate(selectedDomains.map((domain) => ({
				domainName: domain.domain,
				packageId: domain.package.id
			})));
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
			setGoLiveState((prevState) => ({
				...prevState,
				selectedDomains: [],
				searchDomain: '',
			}));
			setShowPurchaseNavigation(false);
		}
		goToPreviousStep();
	};

	const handleSave = () => {
		if (activeStep === lastStep) {
			closeAll();
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

export default DomainPurchaseWizard;
