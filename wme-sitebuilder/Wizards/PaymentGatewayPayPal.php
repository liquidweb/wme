<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\InvokesCli;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\PayPal;
use WP_Error;

class PaymentGatewayPayPal extends Wizard {

	use InvokesCli;

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder-store-details';

	/**
	 * @var string
	 */
	protected $wizard_slug = 'payment-gateway-paypal';

	/**
	 * @var string
	 */
	protected $ajax_action = 'sitebuilder-wizard-payment-gateway-paypal';

	/**
	 * @var PayPal
	 */
	protected $plugin;

	/**
	 * Construct.
	 *
	 * @param PayPal $plugin
	 */
	public function __construct( PayPal $plugin ) {
		$this->plugin = $plugin;

		parent::__construct();
	}

	/**
	 * Register hooks.
	 */
	public function register_hooks() {
		parent::register_hooks();

		add_filter( 'woocommerce_paypal_payments_onboarding_redirect_url', [ $this, 'filter__woocommerce_paypal_payments_onboarding_redirect_url' ] );

		$this->add_ajax_action( 'wizard_started', [ $this, 'telemetryWizardStarted' ] );
		$this->add_ajax_action( 'install_plugin', [ $this, 'installPlugin' ] );
		$this->add_ajax_action( 'oauth_props', [ $this, 'oauthProps' ] );
		$this->add_ajax_action( 'get_keys', [ $this, 'getKeys' ] );
		$this->add_ajax_action( 'wizard_completed', [ $this, 'telemetryWizardCompleted' ] );
	}

	/**
	 * Properties for PayPal wizard.
	 *
	 * @return array
	 */
	public function props() {
		return $this->plugin->wizard_props();
	}

	/**
	 * Telemetry: wizard started.
	 */
	public function telemetryWizardStarted() {
		do_action( 'wme_event_wizard_started', sprintf( 'payment-%s', $this->plugin->slug ) );

		return wp_send_json_success();
	}

	/**
	 * AJAX: Install plugin.
	 */
	public function installPlugin() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			return wp_send_json_error(new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator.', 'wme-sitebuilder' )
			), 403);
		}

		$response = $this->makeCommand('wp plugin install', [
			$this->plugin->slug,
			'--activate',
			sprintf( '--version=%s', $this->plugin->supported_version ),
			'--force',
		])->execute();

		if ( ! $response->wasSuccessful() ) {
			wp_send_json_error(new WP_Error(
				'mapps-wpcli-error',
				sprintf(
					/* Translators: %1$s is the exit code from WP CLI; %2$s is output from WP CLI. */
					__( 'Encountered WP CLI exit code "%1$s" with output "%2$s".', 'wme-sitebuilder' ),
					sanitize_text_field( $response->getExitCode() ),
					sanitize_text_field( $response->getOutput() )
				)
			), 500);
		}

		wp_send_json_success( null, 200 );
	}

	/**
	 * AJAX: Provide PayPal keys.
	 */
	public function getKeys() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator.', 'wme-sitebuilder' )
			), 403);
		}

		wp_send_json_success( $this->plugin->keys );
	}

	/**
	 * AJAX: Provide oAuth properties.
	 */
	public function oauthProps() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_send_json_error(new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator.', 'wme-sitebuilder' )
			), 403);
		}

		$data = [
			'oauth_urls'       => $this->plugin->oauth_urls,
			'onboarding_nonce' => wp_create_nonce( \WooCommerce\PayPalCommerce\Onboarding\Endpoint\LoginSellerEndpoint::nonce() ),
		];

		wp_send_json_success( $data, 200 );
	}

	/**
	 * Telemetry: wizard completed.
	 */
	public function telemetryWizardCompleted() {
		do_action( 'wme_event_wizard_started', sprintf( 'payment-%s', $this->plugin->slug ) );

		return wp_send_json_success();
	}

	/**
	 * Finish the wizard.
	 */
	public function finish() {
	}

	/**
	 * Filter: woocommerce_paypal_payments_onboarding_redirect_url.
	 *
	 * Redirect completion of PayPal oAuth workflow back into wizard.
	 *
	 * @param string $location
	 *
	 * @return string
	 */
	public function filter__woocommerce_paypal_payments_onboarding_redirect_url( $location ) {
		if ( 'woocommerce_paypal_payments_onboarding_redirect_url' !== current_filter() ) {
			return $location;
		}

		// The ?step is not a query parameter, so we need to add it here.
		$query_param_page = $this->admin_page_slug . '#/wizard/payments-paypal?step=2';

		return add_query_arg([
			'page' => $query_param_page,
		], admin_url( 'admin.php' ));
	}
}
