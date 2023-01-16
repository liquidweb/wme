import { useEffect, useState } from 'react';
import { WizardFooter } from '@moderntribe/wme-ui';
import { beforeUnloadListener } from '@moderntribe/wme-utils';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';
import { WizardSidebar } from '@sb/components';
import { useWizard, useFirstTimeConfiguration } from '@sb/hooks';
import WizardCloseWarning from '@sb/wizards/WizardCloseWarning';
import { Grid } from '@mui/material';

const FirstTimeConfigurationWizard = () => {
	const {
		ftcState: { steps, isLoading, lastStep },
		submitForm
	} = useFirstTimeConfiguration();

	const {
		wizardState: { showCloseWarning, hasStepped },
		goToNextStep,
		goToPreviousStep,
		goToStep,
		setShowCloseWarning
	} = useWizard();

	const [searchParams] = useSearchParams();
	const [stepIndex, setStepIndex] = useState<number>();
	const [isLastStep, setIsLastStep] = useState(false);
	const [currentScreen, setCurrentScreen] = useState<StepInterface>();

	useEffect(() => {
		if (searchParams.get('step')) {
			const activeStep = Number(searchParams.get('step'));
			setStepIndex(activeStep >= 1 ? activeStep - 1 : 0);
		} else {
			setStepIndex(0);
		}
	}, [searchParams.get('step')]);

	useEffect(() => {
		if (! isLoading && stepIndex !== undefined) {
			setIsLastStep((stepIndex + 1) === lastStep);
			setCurrentScreen(steps[ stepIndex ]);
		}
	}, [lastStep, isLoading, stepIndex, steps]);

	// Warn users if the begin to navigate away.
	useEffect(() => {
		addEventListener('beforeunload', beforeUnloadListener);
		return () => removeEventListener('beforeunload', beforeUnloadListener);
	}, []);

	useEffect(() => {
		if (hasStepped) {
			// Enable the close warning behavior.
			setShowCloseWarning(false);
		}
	}, [hasStepped]);

	const handleOnNext = () => {
		if (isLastStep) {
			return;
		}
		goToNextStep();
	};

	const handleOnSave = () => {
		submitForm();
	};

	if (! currentScreen) {
		return <div />;
	}

	return (
		<Grid container sx={ { position: 'absolute', inset: 0 } }>
			<WizardSidebar
				show={ ! isLastStep }
				label={ currentScreen.label }
				description={ currentScreen.description }
				icon={ currentScreen.icon }
			/>
			<Grid
				item
				xs={ isLastStep ? 12 : 9.5 }
				sx={ {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				} }>
				{ currentScreen.screen }
			</Grid>
			<WizardFooter
				sx={ {
					position: 'fixed',
					bottom: 0,
					left: isLastStep ? 0 : '20.833333%',
					right: 0,
					marginInline: 0,
					backgroundColor: 'transparent'
				} }
				steps={ steps }
				activeStep={ stepIndex || 0 }
				isLoading={ isLoading }
				loadingText={ __('Loading…', 'moderntribe-sitebuilder') }
				isLastStep={ isLastStep }
				onBack={ goToPreviousStep }
				onNext={ handleOnNext }
				save={ handleOnSave }
				onClickStep={ ({ id }: { id: string | number }) => goToStep(Number(id) + 1) }
				hideFooter={ false }
				backText={ __('Back', 'moderntribe-sitebuilder') }
				skipText={ __('Skip', 'moderntribe-sitebuilder') }
				nextText={
					currentScreen.nextText || __('Next', 'moderntribe-sitebuilder')
				}
			/>
			{ showCloseWarning && <WizardCloseWarning open={ showCloseWarning } /> }
		</Grid>
	);
};

export default FirstTimeConfigurationWizard;
