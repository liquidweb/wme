<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Concerns\InvokesCli;
use Tribe\WME\Sitebuilder\Plugins\Shipping as ShippingPlugins;

class Shipping extends Card {

	use InvokesCli;

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder-store-details';

	/**
	 * @var string
	 */
	protected $card_slug = 'shipping';

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

		add_action( 'admin_init', [$this, 'handle_plugin_install_request'], 2 );
	}

	/**
	 * Install requested plugins.
	 */
	public function handle_plugin_install_request() {
		// Ensure this is a request to admin and also not an ajax request.
		if ( ! is_admin() || wp_doing_ajax() ) {
			return;
		}

		// Ensure this is a request to install a plugin.
		if ( ! isset( $_GET['page'] ) || 'sitebuilder-store-details' !== $_GET['page'] ) {
			return;
		}

		if ( ! isset( $_GET['action'] ) || 'install-plugin' !== $_GET['action'] ) {
			return;
		}

		// Ensure user has permission to install plugins.
		if ( ! current_user_can( 'install_plugins' ) ) {
			wp_die( __( 'You are not authorized to install plugins.', 'wme-sitebuilder' ) );
		}

		$requested_plugin = sanitize_text_field( $_GET['plugin'] );

		if ( null === $requested_plugin ) {
			wp_die( __( 'You are not authorized to install plugins.', 'wme-sitebuilder' ) );
		}

		$supported_plugins = $this->plugins->getPlugins();

		if ( ! isset( $supported_plugins[ $requested_plugin ] ) ) {
			wp_die( __( 'The requested plugin is not supported by this installer.', 'wme-sitebuilder' ) );
		}

		if ( ! empty( $supported_plugins[ $requested_plugin ]['active'] ) ) {
			wp_die( __( 'The requested plugin is already installed and active.', 'wme-sitebuilder' ) );
		}

		$response = $this->makeCommand('wp plugin install', [
			$requested_plugin,
			'--activate',
		])->execute();

		if ( ! $response->wasSuccessful() ) {
			wp_die(
				sprintf(
				/* Translators: %1$s is the exit code from WP CLI; %2$s is output from WP CLI. */
					__( 'Encountered WP CLI exit code "%1$s" with output "%2$s".', 'wme-sitebuilder' ),
					sanitize_text_field( $response->getExitCode() ),
					sanitize_text_field( $response->getOutput() )
				)
			);
		}

		// Redirect user back to the shipping card.
		wp_safe_redirect( $supported_plugins[ $requested_plugin ]['activation_redirect'] );
	}

	/**
	 * Properties for card.
	 *
	 * @return array
	 */
	public function props() {
		$button_props = [
			'usps'     => [
				'label'           => __( 'Add USPS', 'wme-sitebuilder' ),
				'backgroundColor' => '#004B87',
				// TODO: Redirect user to an action that installs and activates the plugin.
				'href'            => admin_url( 'admin.php?page=sitebuilder-store-details&action=install-plugin&plugin=elex-usps-shipping-method' ),
			]
		];

		// Flat rate is built-in to WooCommerce.
		$rows = [
			[
				'id'      => 'flat-rate',
				'type'    => 'task',
				'taskCta' => __( 'Flat Rate Settings', 'wme-sitebuilder' ),
				'title'   => __( 'Flat Rate Shipping', 'wme-sitebuilder' ),
				'intro'   => __( 'Charge a fixed rate of your choosing for shipping.', 'wme-sitebuilder' ),
				'url'     => admin_url( 'admin.php?page=wc-settings&tab=shipping' ),
			],
			[
				'id'          => 'usps',
				'type'        => 'task',
				'taskCta'     => __( 'USPS Settings', 'wme-sitebuilder' ),
				'title'       => ! $this->plugins->isUspsActive() ? __( 'Add USPS Shipping', 'wme-sitebuilder' ) : __( 'USPS Shipping', 'wme-sitebuilder' ),
				'intro'       => __( 'Shipping rates based on address and cart content through USPS.', 'wme-sitebuilder' ),
				'disabled'    => false,
				'disableText' => '',
				'url'         => $this->plugins->isUspsActive() ? admin_url( 'admin.php?page=wc-settings&tab=shipping&section=elex_shipping_usps' ) : null,
				'button'      => ! $this->plugins->isUspsActive() ? $button_props['usps'] : null,
			],
		];

		// Check our supported shipping plugins.
		foreach ( $this->plugins->getPlugins() as $plugin ) {
			if ( empty( $plugin['active'] ) || empty( $plugin['card'] ) ) {
				continue;
			}

			$rows[] = $plugin['card'];
		}

		return [
			'id'        => 'shipping-configuration',
			'title'     => __( 'Configure shipping', 'wme-sitebuilder' ),
			'intro'     => __( 'Offer flat rate shipping and/or set up ShipStation to offer multiple rates.', 'wme-sitebuilder' ),
			'completed' => false,
			'rows'      => $rows,
			'footer'    => [
				'collapsible' => false,
				'rows'        => [
					[
						'type'  => 'links',
						'title' => __( 'Need help with shipping?', 'wme-sitebuilder' ),
						'links' => $this->footer_messages(),
					],
				]
			],
		];
	}

	/**
	 * Get card footer messages.
	 *
	 * @return array[]
	 */
	protected function footer_messages() {
		return [
			$this->plugins->card_footer_props()
		];
	}
}
