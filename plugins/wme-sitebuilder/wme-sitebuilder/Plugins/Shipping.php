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
		// TODO: Temporary until we have the real links.
		return [
			'label' => __( 'Help with USPS', 'wme-sitebuilder' ),
			'href'  => '#',
		];
	}
}
