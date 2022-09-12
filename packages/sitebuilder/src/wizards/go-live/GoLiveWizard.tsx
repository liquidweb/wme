import React from 'react';
import { WizardFooter } from '@stellarwp/wme-ui';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';

import { useWizard, useGoLive } from '@sb/hooks';

import WizardCloseWarning from '@sb/wizards/WizardCloseWarning';

const GoLiveWizard = () => {
	const { wizardState: { showCloseWarning }, goToNextStep, goToPreviousStep, goToStep } = useWizard();

	const { goLiveState: { steps } } = useGoLive();

	const handleOnNext = () => {
		goToNextStep();
	};

	const handleOnSkip = () => {
		goToNextStep();
	};

	const handleOnSave = () => {
		// eslint-disable-next-line no-console
		console.log('Save');
	};

	const [searchParams] = useSearchParams();

	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	const stepIndex = activeStep >= 1 ? activeStep - 1 : 0;

	return (
		<>
			{ steps[ stepIndex ].screen }
			<WizardFooter
				sx={ { position: 'fixed' } }
				steps={ steps }
				activeStep={ stepIndex }
				onBack={ goToPreviousStep }
				onNext={ handleOnNext }
				onSkip={ handleOnSkip }
				save={ handleOnSave }
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
