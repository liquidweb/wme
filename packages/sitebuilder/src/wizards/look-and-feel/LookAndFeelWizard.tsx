import React, { useEffect } from 'react';
import { WizardFooter } from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';
import { useWizard, useLookAndFeel } from '@sb/hooks';
import WizardCloseWarning from '@sb/wizards/WizardCloseWarning';
import DeleteContentWarning from './DeleteContentWarning';

const LookAndFeelWizard = () => {
	const { wizardState: { showCloseWarning }, goToNextStep, goToPreviousStep } = useWizard();

	const { lookAndFeelState: { steps, lastStep, showDeleteWarning, template, importDone }, initImport } = useLookAndFeel();

	const [searchParams] = useSearchParams();

	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	const stepIndex = activeStep >= 1 ? activeStep - 1 : 0;

	const handleOnNext = () => {
		if (activeStep === lastStep) {
			return;
		}

		if (activeStep === 4) {
			initImport();
		}

		goToNextStep();
	};

	const handleOnSkip = () => {
		goToNextStep();
	};

	return (
		<>
			{
				showDeleteWarning && ! importDone ? <DeleteContentWarning open={ showDeleteWarning } />
					: steps[ stepIndex ].screen
			}
			<WizardFooter
				sx={ { position: 'fixed' } }
				steps={ steps }
				activeStep={ stepIndex }
				onBack={ goToPreviousStep }
				onNext={ handleOnNext }
				disableNext={ template.name === '' ? true : false }
				onSkip={ handleOnSkip }
				isLastStep={ activeStep === lastStep }
				// onClickStep={ ({ id }: { id: string | number }) => goToStep(Number(id) + 1) }
				hideFooter={ false }
				backText={ __('Back', 'nexcess-mapps') }
				skipText={ __('Skip', 'nexcess-mapps') }
				nextText={ steps[ stepIndex ].nextText || __('Next', 'nexcess-mapps') }
			/>
			{ showCloseWarning && <WizardCloseWarning open={ showCloseWarning } /> }
		</>
	);
};

export default LookAndFeelWizard;
