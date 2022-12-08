/* eslint-disable no-console */
import { useEffect } from 'react';
import { WizardFooter } from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import { useWizard, usePaymentsStripe } from '@store/hooks';
import { useSearchParams } from 'react-router-dom';
import { handleActionRequest } from '@moderntribe/wme-utils';
import { PAYMENTS_STRIPE_PROPS } from '@store/constants';
import { ErrorKeys } from '@payments/shared-screens';
import { ErrorPluginInstall } from '@payments/stripe/screens';

const PaymentsStripeWizard = () => {
	const { goToNextStep, closeAll } = useWizard();
	const { paymentsStripeState: {
		steps,
		pluginActive,
		pluginInstalled,
		error,
		isLoading,
		oauthUrl
	}, setOauthUrl, installPlugin, setError, setIsLoading } = usePaymentsStripe();
	const [searchParams] = useSearchParams();
	const stripeNonce = PAYMENTS_STRIPE_PROPS.ajax.nonce || '';
	const stripeAction = PAYMENTS_STRIPE_PROPS.ajax.action || '';
	const supportLink = PAYMENTS_STRIPE_PROPS.plugin.adminUrl;
	const stripe = 'Stripe';

	// If critical error on WordPress, still set Error component
	useEffect(() => {
		window.addEventListener('unhandledrejection', function (event) {
			console.log(event.promise);
			setError(true);
		});
	}, []);

	useEffect(() => {
		if (oauthUrl) {
			triggerOauth();
		}
	}, [oauthUrl]);

	// Listens for click on hidden button and redirects to oauth url.
	const getOauthUrl = async () => {
		setIsLoading(true);
		const data = {
			_wpnonce: stripeNonce,
			action: stripeAction,
			sub_action: 'oauth_url',
		};

		const response = await handleActionRequest(data) as string;
		if (response) {
			setOauthUrl(response);
		} else {
			setError(true);
		}
	};

	// Makes ajax call to install/activate plugin, then gets oauth url and sets it in oauthUrls state.
	const handleOauth = async () => {
		if (oauthUrl) {
			triggerOauth();
			return;
		}

		if (pluginActive && pluginInstalled) {
			getOauthUrl();
		} else {
			const response = await installPlugin() as string;
			if (response === 'success') {
				getOauthUrl();
			}
		}
	};

	const triggerOauth = () => {
		window.location.href = oauthUrl;
	};

	const handleNext = () => {
		if (activeStep === stepsMax) {
			return;
		}

		if (activeStep === 1) {
			handleOauth();
			return;
		}

		goToNextStep();
	};

	const activeStep = searchParams.get('step')
		? Number(searchParams.get('step'))
		: 1;
	const stepIndex = activeStep >= 1 ? activeStep - 1 : 0;

	const stepsMax = steps.length;

	let nextText = '';
	if (activeStep === 1) {
		nextText = __('Connect Stripe', 'moderntribe-storebuilder');
	} else if (activeStep === 2) {
		nextText = __('Next', 'moderntribe-storebuilder');
	} else {
		nextText = __('Complete', 'moderntribe-storebuilder');
	}

	let errorComponent;
	if (activeStep === 1) {
		errorComponent = <ErrorPluginInstall supportLink={ supportLink } />;
	} else {
		errorComponent = <ErrorKeys pluginName={ stripe } supportLink={ supportLink } />;
	}

	const handleSave = () => {
		setError(false);
		closeAll();
	};

	return (
		<>
			{
				error
					? errorComponent
					: steps[ stepIndex ]?.screen
			}
			<WizardFooter
				activeStep={ stepIndex }
				steps={ steps }
				save={ handleSave }
				onNext={ handleNext }
				nextText={ nextText }
				isLoading={ isLoading }
				loadingText={ __('Loading…', 'moderntribe-storebuilder') }
				disableNext={ error }
				isLastStep={ activeStep === stepsMax ? true : false }
				hideFooter={ false }
			/>
		</>
	);
};

export default PaymentsStripeWizard;
