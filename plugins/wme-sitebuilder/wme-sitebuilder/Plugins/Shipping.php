<?php

namespace Tribe\WME\Sitebuilder\Plugins;

use Tribe\WME\Sitebuilder\Concerns\HasWordPressDependencies;

class Shipping {

	use HasWordPressDependencies;

	/**
	 * @var array
	 */
	protected $plugins = [];

	/**
	 * Construct.
	 */
	public function __construct() {
		/**
		 * ELEX WooCommerce USPS Shipping Method.
		 *
		 * @link https://wordpress.org/plugins/elex-usps-shipping-method/
		 */
		$this->plugins['elex-usps-shipping-method'] = [
			'active' => (bool) $this->isPluginActive( 'elex-usps-shipping-method/usps-woocommerce-shipping.php' ),
			'card'   => [
				'id'          => 'usps',
				'type'        => 'task',
				'taskCta'     => __( 'USPS Settings', 'wme-sitebuilder' ),
				'title'       => __( 'USPS', 'wme-sitebuilder' ),
				'intro'       => __( 'Shipping rates based on address and cart content through USPS.', 'wme-sitebuilder' ),
				'icon'        => 'setup-icon-usps.png',
				'disabled'    => false,
				'disableText' => '',
				'url'         => admin_url( 'admin.php?page=wc-settings&tab=shipping&section=elex_shipping_usps' ),
			],
		];
	}

	/**
	 * Get supported plugins.
	 *
	 * @return array
	 */
	public function getPlugins() {
		return $this->plugins;
	}
}
