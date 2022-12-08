/* eslint-disable no-console */
import { useEffect } from 'react';
import { WizardFooter } from '@moderntribe/wme-ui';
import { __ } from '@wordpress/i18n';
import { useWizard, usePaymentsPaypal } from '@store/hooks';
import { useSearchParams } from 'react-router-dom';
import { handleActionRequest } from '@moderntribe/wme-utils';
import { PAYMENTS_PAYPAL_PROPS } from '@store/constants';
import { ErrorKeys } from '@payments/shared-screens';
import { ErrorPluginInstall } from '@payments/paypal/screens';

interface OauthInterface {
	oauth_urls: {
		standard: string;
		advanced: string;
	};
	onboarding_nonce: string;
}

const PaymentsPaypalWizard = () => {
	const { currentStep, goToNextStep, closeAll } = useWizard();
	const { paymentsPaypalState: {
		steps,
		plan,
		pluginActive,
		pluginInstalled,
		error,
		isLoading,
		oauthUrls
	}, setOauthUrls, installPlugin, setError, setIsLoading } = usePaymentsPaypal();
	const [searchParams] = useSearchParams();
	const paypalNonce = PAYMENTS_PAYPAL_PROPS.ajax.nonce || '';
	const paypalAction = PAYMENTS_PAYPAL_PROPS.ajax.action || '';
	const supportLink = PAYMENTS_PAYPAL_PROPS.plugin.adminUrl;
	const API_ERROR_MESSAGE = __('API credentials must be entered to save the settings.', 'nexcess-mapps');
	const CALLBACK_ERROR_MESSAGE = __('Something went wrong, please try again using the PayPal plugin settings or contact PayPal support', 'nexcess-mapps');
	const paypal = 'PayPal';

	// PayPal variables.
	const paypalJsId = 'ppcp-onboarding-paypal-js';
	const PayPalCommerceGatewayOnboarding = {
		endpoint: '/?wc-ajax=ppc-login-seller',
		paypal_js_url: 'https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js',
		error_messages: {
			no_credentials: API_ERROR_MESSAGE,
		}
	};

	// If critical error on WordPress, still set Error component
	useEffect(() => {
		window.addEventListener('unhandledrejection', function (event) {
			console.log(event.promise);
			setError(true);
		});
	}, []);

	useEffect(() => {
		// Mimics how WooCommerce handles loading external scripts needed for oauth.
		[paypalJsId, 'signup-js', 'biz-js'].forEach(
			(scriptID) => {
				const scriptTag = document.getElementById(scriptID);

				if (scriptTag) {
					scriptTag.parentNode?.removeChild(scriptTag);
				}

				if ('undefined' !== typeof window.PayPal) {
					delete window.PayPal;
				}
			}
		);

		// Load necessary scripts for PayPal oauth.
		const paypalScriptTag = document.createElement('script');
		paypalScriptTag.id = paypalJsId;
		paypalScriptTag.src = PayPalCommerceGatewayOnboarding.paypal_js_url;
		document.body.append(paypalScriptTag);

		// authCode and sharedId are returned from an external PayPal script triggered by the 'data-paypal-onboard-complete' callback.
		window.ppcp_onboarding_productionCallback = function (authCode, sharedId) {
			const nonce = oauthUrls.onboardingNonce;
			console.log(nonce);

			fetch(
				PayPalCommerceGatewayOnboarding.endpoint,
				{
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(
						{
							authCode,
							sharedId,
							nonce,
							env: 'production',
							acceptCards: true,
						}
					)
				}
			).then((response) => {
				if (! response.ok) {
					throw new Error(CALLBACK_ERROR_MESSAGE);
				}
			}).catch((err) => {
				// eslint-disable-next-line no-console
				console.log(err);
			});
		};
	}, [currentStep, oauthUrls.onboardingNonce]);

	useEffect(() => {
		if (oauthUrls.advanced !== '' && oauthUrls.standard !== '') {
			triggerOauth();
		}
	}, [oauthUrls.advanced, oauthUrls.standard]);

	// Listens for click on hidden button and redirects to oauth url.
	const getOauthUrls = async () => {
		setIsLoading(true);
		const data = {
			_wpnonce: paypalNonce,
			action: paypalAction,
			sub_action: 'oauth_props',
		};

		const response = await handleActionRequest(data) as OauthInterface;
		if (response) {
			setOauthUrls({
				standard: response?.oauth_urls?.standard,
				advanced: response?.oauth_urls?.advanced,
				onboardingNonce: response?.onboarding_nonce
			});
		} else {
			setError(true);
		}
	};

	// Makes ajax call to install/activate plugin, then gets oauth url and sets it in oauthUrls state.
	const handleOauth = async () => {
		if (oauthUrls.advanced && oauthUrls.standard) {
			triggerOauth();
			return;
		}

		if (pluginActive && pluginInstalled) {
			getOauthUrls();
		} else {
			const response = await installPlugin() as string;
			if (response === 'success') {
				getOauthUrls();
			}
		}
	};

	const triggerOauth = () => {
		const paypalButton = document.getElementById('paypal-oauth-button') as HTMLElement;
		paypalButton.click();
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
		nextText = __('Activate PayPal', 'nexcess-mapps');
	} else if (activeStep === 2) {
		nextText = __('Next', 'nexcess-mapps');
	} else {
		nextText = __('Complete', 'nexcess-mapps');
	}

	let errorComponent;
	if (activeStep === 1) {
		errorComponent = <ErrorPluginInstall supportLink={ supportLink } />;
	} else {
		errorComponent = <ErrorKeys pluginName={ paypal } supportLink={ supportLink } />;
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
				loadingText={ __('Loading…', 'nexcess-mapps') }
				disableNext={ error }
				isLastStep={ activeStep === stepsMax ? true : false }
				hideFooter={ false }
			/>
			<a
				style={ { display: 'none' } }
				href={ plan === 'standard' ? oauthUrls.standard : oauthUrls.advanced }
				className="button-primary"
				id="paypal-oauth-button"
				data-paypal-onboard-complete="ppcp_onboarding_productionCallback"
				data-paypal-onboard-button="true"
				data-paypal-button="true"
				data-securewindowmsg="Don't see the secure PayPal browser? We'll help you re-launch the window to complete your flow.You might need to enable pop-ups in your browser in order to continue." data-securebuttonmsg="Continue" data-ppcp-button-initialized="true"
			>
				{ __('PayPal Oauth Button', 'nexcess-mapps') }
			</a>
		</>
	);
};

export default PaymentsPaypalWizard;
