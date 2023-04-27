<?php

namespace Tribe\WME\Sitebuilder\Plugins;

use Tribe\WME\Sitebuilder\Concerns\HasWordPressDependencies;

class Shipping {

	use HasWordPressDependencies;

	/**
	 * @var array Supported shipping plugins.
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
			'active'              => (bool) $this->isPluginActive( 'elex-usps-shipping-method/usps-woocommerce-shipping.php' ),
			'activation_redirect' => admin_url( 'admin.php?page=wc-settings&tab=shipping&section=elex_shipping_usps' ),
			'version'             => 'latest'
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

	/**
	 * Is USPS active?
	 *
	 * @return bool
	 */
	public function isUspsActive() {
		return $this->plugins['elex-usps-shipping-method']['active'];
	}

	/**
	 * Get properties for footer message.
	 *
	 * @return array
	 */
	public function card_footer_props() {
		return [
			[
				'label' => __('Help with Flat Rate Shipping', 'wme-sitebuilder'),
				'href' => 'https://woocommerce.com/document/flat-rate-shipping',
				'target' => '_blank',
			],
			[
				'label' => __('More info about the USPS Plugin', 'wme-sitebuilder'),
				'href' => 'https://wordpress.org/plugins/elex-usps-shipping-method',
				'target' => '_blank',
			]
		];
	}
}
