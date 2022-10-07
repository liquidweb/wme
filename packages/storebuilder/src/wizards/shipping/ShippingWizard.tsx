import React, { useEffect } from 'react';
import { WizardFooter } from '@stellarwp/wme-ui';
import { __ } from '@wordpress/i18n';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWizard, useShipping } from '@store/hooks';
import { beforeUnloadListener } from '@store/utils';
import { STOREBUILDER_URL } from '@store/constants';

const ShippingWizard = () => {
	const {
		shippingState: {
			steps,
			isLoading,
			error,
			providersActivated,
		},
		setProvidersActivated,
		submitProvidersAndActivate
	} = useShipping();

	const { goToStep } = useWizard();

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

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
		submitProvidersAndActivate();
	};

	const handleOnSave = () => {
		removeEventListener('beforeunload', beforeUnloadListener);
		setProvidersActivated(false);
		window.location.assign(`${ STOREBUILDER_URL }`);
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
				isLastStep={ ! error && providersActivated }
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
		</>
	);
};

export default ShippingWizard;
