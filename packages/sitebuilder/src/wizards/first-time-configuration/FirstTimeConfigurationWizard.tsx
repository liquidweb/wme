import { useEffect } from 'react';
import { WizardFooter, WizardSidebar } from '@moderntribe/wme-ui';
import { beforeUnloadListener } from '@moderntribe/wme-utils';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';

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
		<Grid container sx={ { position: 'absolute', inset: 0 } }>
			{ activeStep !== lastStep && (
				<Grid item xs={ 2.5 } sx={ {
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					zIndex: 2
				} }>
					<WizardSidebar
						heading={ steps[ stepIndex ].label || '' }
						body={ steps[ stepIndex ].description || '' }
						icon={ steps[ stepIndex ].icon }
					/>
				</Grid>
			) }
			<Grid
				item
				xs={ activeStep === lastStep ? 12 : 9.5 }
				sx={ {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				} }>
				{ steps[ stepIndex ].screen }
			</Grid>
			<WizardFooter
				sx={ {
					position: 'fixed',
					bottom: 0,
					left: activeStep === lastStep ? 0 : '20.833333%',
					right: 0,
					marginInline: 0,
					backgroundColor: 'transparent'
				} }
				steps={ steps }
				activeStep={ stepIndex }
				isLoading={ isLoading }
				loadingText={ __('Loading…', 'moderntribe-sitebuilder') }
				isLastStep={ activeStep === lastStep }
				onBack={ goToPreviousStep }
				onNext={ handleOnNext }
				save={ handleOnSave }
				onClickStep={ ({ id }: { id: string | number }) => goToStep(Number(id) + 1) }
				hideFooter={ false }
				backText={ __('Back', 'moderntribe-sitebuilder') }
				skipText={ __('Skip', 'moderntribe-sitebuilder') }
				nextText={
					steps[ stepIndex ].nextText || __('Next', 'moderntribe-sitebuilder')
				}
			/>
			{ showCloseWarning && <WizardCloseWarning open={ showCloseWarning } /> }
		</Grid>
	);
};

export default FirstTimeConfigurationWizard;
