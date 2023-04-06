<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Plugins\Shipping as ShippingPlugins;

class Shipping extends Card {

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
				'href'            => admin_url( 'admin.php?page=wc-settings&tab=shipping' ),
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
				'title'       => __( 'USPS', 'wme-sitebuilder' ),
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
