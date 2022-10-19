<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\InvokesCli;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\Stripe;
use WP_Error;

class PaymentGatewayStripe extends Wizard {

	use InvokesCli;

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder-store-details';

	/**
	 * @var string
	 */
	protected $wizard_slug = 'payment-gateway-stripe';

	/**
	 * @var string
	 */
	protected $ajax_action = 'sitebuilder-wizard-payment-gateway-stripe';

	/**
	 * @var Stripe
	 */
	protected $plugin;

	/**
	 * Construct.
	 *
	 * @param Stripe $plugin
	 */
	public function __construct( Stripe $plugin ) {
		$this->plugin = $plugin;

		parent::__construct();
	}

	/**
	 * Register hooks.
	 */
	public function register_hooks() {
		parent::register_hooks();

		add_filter( 'wp_redirect', [ $this, 'filter__wp_redirect' ] );

		$this->add_ajax_action( 'wizard_started', [ $this, 'telemetryWizardStarted' ] );
		$this->add_ajax_action( 'install_plugin', [ $this, 'installPlugin' ] );
		$this->add_ajax_action( 'oauth_url', [ $this, 'oauthUrl' ] );
		$this->add_ajax_action( 'get_keys', [ $this, 'getKeys' ] );
		$this->add_ajax_action( 'wizard_completed', [ $this, 'telemetryWizardCompleted' ] );
	}

	/**
	 * Properties for Stripe wizard.
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
	 * AJAX: Provide oAuth URL.
	 */
	public function oauthUrl() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_send_json_error(new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator.', 'wme-sitebuilder' )
			), 403);
		}

		wp_send_json_success( $this->plugin->oauth_url, 200 );
	}

	/**
	 * AJAX: Provide Stripe keys.
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
	 * Telemetry: wizard completed.
	 */
	public function telemetryWizardCompleted() {
		do_action( 'wme_event_wizard_completed', sprintf( 'payment-%s', $this->plugin->slug ) );

		return wp_send_json_success();
	}

	/**
	 * Finish the wizard.
	 */
	public function finish() {
	}

	/**
	 * Filter: wp_redirect.
	 *
	 * Redirect completion of Stripe oAuth workflow back into wizard.
	 *
	 * @see WC_Stripe_Connect::maybe_handle_redirect()
	 *
	 * @param string $location
	 *
	 * @return string
	 */
	public function filter__wp_redirect( $location ) {
		if ( 'wp_redirect' !== current_filter() ) {
			return $location;
		}

		// Not Stripe oAuth workflow completion.
		if ( ! isset( $_GET['wcs_stripe_code'], $_GET['wcs_stripe_state'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			return $location;
		}

		// The ?step is not a query parameter, so we need to add it here.
		$query_param_page = $this->admin_page_slug . '#/wizard/payments-stripe?step=2';

		return add_query_arg( [
			'page' => $query_param_page,
		], admin_url( 'admin.php' ) );
	}
}
