import React, { useEffect } from 'react';
import { WizardFooter } from '@stellarwp/wme-ui';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';

import { useWizard, useStoreSetup } from '@store/hooks';
import WizardCloseWarning from '@store/wizards/WizardCloseWarning';
import { beforeUnloadListener } from '@store/utils';

const StoreSetupWizard = () => {
	const {
		storeSetupState: { steps, isLoading, lastStep },
		isScreenTouched,
		resetFormValues,
		submitForm
	} = useStoreSetup();

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
		goToNextStep();
	};

	const handleOnSave = () => {
		submitForm();
	};

	const handleOnSkip = () => {
		resetFormValues();
		goToNextStep();
	};

	console.log('step: ', activeStep );
	console.log('isScreenTouched: ', isScreenTouched() );

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
				onSkip={ handleOnSkip }
				save={ handleOnSave }
				onClickStep={ ({ id }: { id: string | number }) => goToStep(Number(id) + 1) }
				hideFooter={ false }
				hideSkip={ ! isScreenTouched() }
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

export default StoreSetupWizard;
