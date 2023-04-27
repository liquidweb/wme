<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Exception;
use Tribe\WME\Sitebuilder\Concerns\InvokesCli;
use Tribe\WME\Sitebuilder\Plugins\Shipping as ShippingPlugins;
use Tribe\WME\Sitebuilder\Support\Downloader\PluginInstaller;
use WP_Error;

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
	 * @var PluginInstaller
	 */
	protected $pluginInstaller;

	/**
	 * Construct.
	 *
	 * @param ShippingPlugins $shipping_plugins
	 */
	public function __construct( ShippingPlugins $shipping_plugins, PluginInstaller $pluginInstaller ) {
		$this->plugins = $shipping_plugins;
		$this->pluginInstaller = $pluginInstaller;

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

		try {
			$this->pluginInstaller->install( $requested_plugin, $supported_plugins[ $requested_plugin ]['version'] );
		} catch ( Exception $e ) {
			wp_die( new WP_Error(
				'mapps-wpcli-error',
				sprintf(
				/* Translators: %1$s is the error message */
					__( 'Encountered error installing plugin with output "%1$s".', 'wme-sitebuilder' ),
					sanitize_text_field( $e->getMessage() )
				)
			) );
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
				'label'           => __( $this->plugins->isUspsActive() ? 'Manage USPS' : 'Add USPS', 'wme-sitebuilder' ),
				'backgroundColor' => '#004B87',
				'href'            => admin_url( $this->plugins->isUspsActive() ? 'admin.php?page=wc-settings&tab=shipping&section=elex_shipping_usps' : 'admin.php?page=sitebuilder-store-details&action=install-plugin&plugin=elex-usps-shipping-method' ),
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
				'button'      => $button_props['usps'],
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
		return $this->plugins->card_footer_props();
	}
}
