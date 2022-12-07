import { useEffect } from '@wordpress/element';
import { WizardFooter } from '@moderntribe/wme-ui';
import { beforeUnloadListener } from '@moderntribe/wme-utils';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';

import { useWizard, useFirstTimeConfiguration } from '@sb/hooks';
import WizardCloseWarning from '@sb/wizards/WizardCloseWarning';

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

	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	const stepIndex = activeStep >= 1 ? activeStep - 1 : 0;

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
		if (activeStep === lastStep) {
			return;
		}
		// setStepDataTouched(stepIndex);
		goToNextStep();
	};

	const handleOnSave = () => {
		submitForm();
	};

	return (
		<>
			{ steps[ stepIndex ].screen }
			<WizardFooter
				sx={ { position: 'fixed' } }
				steps={ steps }
				activeStep={ stepIndex }
				isLoading={ isLoading }
				loadingText={ __('Loading…', 'nexcess-mapps') }
				isLastStep={ activeStep === lastStep }
				onBack={ goToPreviousStep }
				onNext={ handleOnNext }
				save={ handleOnSave }
				onClickStep={ ({ id }: { id: string | number }) => goToStep(Number(id) + 1) }
				hideFooter={ false }
				backText={ __('Back', 'nexcess-mapps') }
				skipText={ __('Skip', 'nexcess-mapps') }
				nextText={
					steps[ stepIndex ].nextText || __('Next', 'nexcess-mapps')
				}
			/>
			{ showCloseWarning && <WizardCloseWarning open={ showCloseWarning } /> }
		</>
	);
};

export default FirstTimeConfigurationWizard;
