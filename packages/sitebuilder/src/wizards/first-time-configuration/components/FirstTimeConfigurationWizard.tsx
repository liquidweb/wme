import { useEffect, useState } from 'react';
import { WizardFooter } from '@moderntribe/wme-ui';
import { beforeUnloadListener } from '@moderntribe/wme-utils';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';
import { WizardExitButton, WizardSidebar } from '@sb/components';
import { useWizard, useFirstTimeConfiguration } from '@sb/hooks';
import WizardCloseWarning from '@sb/wizards/WizardCloseWarning';
import { Box, Grid } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { LOGO } from '@sb/constants';
import ScreenWrapper from './ScreenWrapper';
import { ErrorScreen } from '../screens';

const FirstTimeConfigurationWizard = () => {
	const {
		ftcState: { steps, isLoading, lastStep },
		submitForm
	} = useFirstTimeConfiguration();

	const {
		wizardState: { showCloseWarning, hasStepped, error },
		goToNextStep,
		goToPreviousStep,
		goToStep,
		setShowCloseWarning,
		closeAll
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
			setIsLastStep(stepIndex + 1 === lastStep);
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
		goToNextStep();
	};

	const handleOnSave = () => {
		submitForm();
	};

	const handleExitClick = () => {
		if (showCloseWarning !== null) {
			setShowCloseWarning(true);
			return;
		}
		closeAll();
	};

	if (! currentScreen) {
		return <div />;
	}

	const logo = <Box sx={ {
		width: '52px',
		height: '22px',
		backgroundImage: `url(${ LOGO })`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
	} } />;

	return (
		<Grid container sx={ { position: 'absolute', inset: 0 } }>
			<WizardSidebar
				logo={ logo }
				show={ ! currentScreen.hideSidebar }
				label={ currentScreen.title }
				description={ currentScreen.description }
				icon={ currentScreen.icon }
				subText={ currentScreen.footerHelpText }
			/>
			<Grid item xs={ currentScreen.hideSidebar ? 12 : 9.5 }>
				{ ! currentScreen.hideExit && (
					<WizardExitButton
						onExit={ handleExitClick }
						text={ __('Exit to Setup', 'moderntribe-sitebuilder') }
					/>
				) }
				{ error && error.showError && <ErrorScreen logo={ logo } /> }
				<ScreenWrapper>{ currentScreen.screen }</ScreenWrapper>
			</Grid>
			<WizardFooter
				sx={ {
					position: 'fixed',
					bottom: 0,
					left: currentScreen.hideSidebar ? 0 : '20.833333%',
					right: 0,
					marginInline: 0,
					backgroundColor: 'white'
				} }
				steps={ steps }
				activeStep={ stepIndex || 0 }
				isLoading={ isLoading }
				loadingText={ __('Loading…', 'moderntribe-sitebuilder') }
				isLastStep={ isLastStep }
				onBack={ goToPreviousStep }
				onNext={ handleOnNext }
				onSkip={ handleOnNext }
				save={ handleOnSave }
				onClickStep={ ({ id }: { id: string | number }) =>
					goToStep(Number(id) + 1)
				}
				hideFooter={ currentScreen.hideFooter ?? false }
				backText={ __('Back', 'moderntribe-sitebuilder') }
				skipText={ __('Skip', 'moderntribe-sitebuilder') }
				nextText={
					currentScreen.nextText ||
					__('Next', 'moderntribe-sitebuilder')
				}
				nextEndIcon={ <ArrowForward /> }
			/>
			{ showCloseWarning && <WizardCloseWarning open={ showCloseWarning } /> }
		</Grid>
	);
};

export default FirstTimeConfigurationWizard;
