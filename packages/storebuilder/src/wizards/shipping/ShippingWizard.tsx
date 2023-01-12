import { useEffect } from 'react';
import { WizardFooter, WizardSidebar } from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import { useSearchParams } from 'react-router-dom';
import { useWizard, useShipping } from '@store/hooks';
import { beforeUnloadListener } from '@moderntribe/wme-utils';
import { STOREBUILDER_URL } from '@store/constants';
import { Grid } from '@mui/material';

const ShippingWizard = () => {
	const {
		shippingState: {
			steps,
			isLoading,
			error,
			providersActivated,
		},
		setProvidersActivated,
		activateShippingProviderPlugins
	} = useShipping();

	const { goToStep } = useWizard();
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

	const handleOnNext = () => {
		activateShippingProviderPlugins();
	};

	const handleOnSave = () => {
		removeEventListener('beforeunload', beforeUnloadListener);
		setProvidersActivated(false);
		window.location.assign(`${ STOREBUILDER_URL }`);
	};

	return (
		<Grid container sx={ { position: 'absolute', inset: 0 } }>
			{ ! error && (
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
				xs={ error ? 12 : 9.5 }
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
					left: error ? 0 : '20.833333%',
					right: 0,
					marginInline: 0,
					backgroundColor: 'transparent'
				} }
				steps={ steps }
				activeStep={ stepIndex }
				isLoading={ isLoading }
				loadingText={ __('Loading…', 'moderntribe-storebuilder') }
				isLastStep={ ! error && providersActivated }
				onNext={ handleOnNext }
				save={ handleOnSave }
				onClickStep={ ({ id }: { id: string | number }) => goToStep(Number(id) + 1) }
				hideFooter={ false }
				backText={ __('Back', 'moderntribe-storebuilder') }
				skipText={ __('Skip', 'moderntribe-storebuilder') }
				nextText={
					steps[ stepIndex ].nextText || __('Next', 'moderntribe-storebuilder')
				}
			/>
		</Grid>
	);
};

export default ShippingWizard;
