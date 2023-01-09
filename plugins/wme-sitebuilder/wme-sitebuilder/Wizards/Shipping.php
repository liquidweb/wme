<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\InvokesCli;
use Tribe\WME\Sitebuilder\Plugins\Shipping as ShippingPlugins;
use WP_Error;

class Shipping extends Wizard {

	use InvokesCli;

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder-store-details';

	/**
	 * @var string
	 */
	protected $wizard_slug = 'shipping';

	/**
	 * @var string
	 */
	protected $ajax_action = 'sitebuilder-wizard-shipping';

	/**
	 * @var ShippingPlugins Supported shipping plugins.
	 */
	protected $plugins;

	/**
	 * Construct.
	 *
	 * @param ShippingPlugins $shipping_plugins
	 */
	public function __construct( ShippingPlugins $shipping_plugins ) {
		$this->plugins = $shipping_plugins;

		parent::__construct();

		$this->add_ajax_action( 'wizard_started', [ $this, 'telemetryWizardStarted' ] );
		$this->add_ajax_action( 'install', [ $this, 'ajaxInstallPlugins' ] );
	}

	/**
	 * Return wizard properties.
	 *
	 * @return mixed[]
	 */
	public function props() {
		$providers = [];

		foreach ( $this->plugins->getPlugins() as $plugin_slug => $plugin ) {
			$providers[ $plugin_slug ] = [
				'active' => $plugin['active'],
			];
		}

		return [
			'canBeClosed' => true,
			'autoLaunch'  => false,
			'providers'   => $providers,
		];
	}

	/**
	 * Telemetry: wizard started.
	 */
	public function telemetryWizardStarted() {
		$supported_plugins = $this->plugins->getPlugins();
		$requested_plugins = filter_input( INPUT_POST, 'pluginSlugs', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		$plugins_started   = [];

		foreach ( $requested_plugins as $requested_plugin ) {
			if ( ! array_key_exists( $requested_plugin, $supported_plugins ) ) {
				continue;
			}

			$plugins_started[] = $requested_plugin;
		}

		if ( empty( $plugins_started ) ) {
			return wp_send_json_error( 'Invalid plugin slugs.' );
		}

		foreach ( $plugins_started as $plugin_slug ) {
			do_action( 'wme_event_wizard_started', sprintf( 'shipping-%s', $plugin_slug ) );
		}

		return wp_send_json_success();
	}

	/**
	 * Finish.
	 */
	public function finish() {
	}

	/**
	 * Install requested plugins.
	 */
	public function ajaxInstallPlugins() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			return wp_send_json_error(new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator or log into the Nexcess portal to change the site domain.', 'wme-sitebuilder' )
			), 403);
		}

		$requested_plugins = filter_input( INPUT_POST, 'shippingProviders', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		if ( null === $requested_plugins ) {
			return wp_send_json_error(new WP_Error(
				'mapps-missing-parameter',
				__( 'Required "shippingProviders" parameter is missing. Please check your spelling and try again.', 'wme-sitebuilder' )
			), 422);
		}

		$supported_plugins = $this->plugins->getPlugins();
		$install_plugins   = [];

		foreach ( $requested_plugins as $plugin_slug ) {
			if ( ! isset( $supported_plugins[ $plugin_slug ] ) ) {
				continue;
			}

			if ( ! empty( $supported_plugins[ $plugin_slug ]['active'] ) ) {
				continue;
			}

			$install_plugins[] = $plugin_slug;
		}

		if ( empty( $install_plugins ) ) {
			return wp_send_json_error(new WP_Error(
				'mapps-missing-parameter',
				__( 'Required "shippingProviders" parameter was populated, but not actionable.', 'wme-sitebuilder' )
			), 422);
		}

		$response = $this->makeCommand('wp plugin install', [
			implode( ' ', $install_plugins ),
			'--activate',
		])->execute();

		if ( ! $response->wasSuccessful() ) {
			return wp_send_json_error(new WP_Error(
				'mapps-wpcli-error',
				sprintf(
					/* Translators: %1$s is the exit code from WP CLI; %2$s is output from WP CLI. */
					__( 'Encountered WP CLI exit code "%1$s" with output "%2$s".', 'wme-sitebuilder' ),
					sanitize_text_field( $response->getExitCode() ),
					sanitize_text_field( $response->getOutput() )
				)
			), 500);
		}

		foreach ( $install_plugins as $plugin_slug ) {
			do_action( 'wme_event_wizard_completed', sprintf( 'shipping-%s', $plugin_slug ) );
		}

		return wp_send_json_success();
	}
}
