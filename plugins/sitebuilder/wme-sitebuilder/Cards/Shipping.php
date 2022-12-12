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
		// Flat rate is built-in to WooCommerce.
		$rows = [
			[
				'id'          => 'flat-rate',
				'type'        => 'task',
				'taskCta'     => __( 'Flat Rate Settings', 'wme-sitebuilder' ),
				'title'       => __( 'Flat Rate Shipping', 'wme-sitebuilder' ),
				'intro'       => __( 'Charge a fixed rate of your choosing for shipping.', 'wme-sitebuilder' ),
				'icon'        => 'setup-icon-shipping.png',
				'disabled'    => false,
				'disableText' => '',
				'url'         => admin_url( 'admin.php?page=wc-settings&tab=shipping' ),
			],
		];

		// Check our supported shipping plugins.
		foreach ( $this->plugins->getPlugins() as $plugin ) {
			if ( empty( $plugin['active'] ) || empty( $plugin['card'] ) ) {
				continue;
			}

			$rows[] = $plugin['card'];
		}

		// If there are additional options, make wizard available.
		if ( 1 === count( $rows ) && 0 < count( $this->plugins->getPlugins() ) ) {
			$rows[] = [
				'id'   => 'shipping-wizard',
				'type' => 'launch-shipping-wizard',
			];
		}

		return [
			'id'        => 'shipping-configuration',
			'title'     => __( 'Configure shipping', 'wme-sitebuilder' ),
			'intro'     => __( 'Offer flat rate shipping and/or set up ShipStation to offer multiple rates.', 'wme-sitebuilder' ),
			'completed' => false,
			'time'      => '',
			'rows'      => $rows,
			'footers'   => [
				[
					'id'    => 'learning-shipping',
					'type'  => 'accordion',
					'title' => __( 'Learn more about Shipping', 'wme-sitebuilder' ),
					'rows'  => [
						[
							'id'   => 'learn-shipping',
							'type' => 'learn-shipping',
						],
						[
							'id'      => 'manage-shipping-row-1',
							'type'    => 'columns',
							'title'   => '',
							'intro'   => '',
							'columns' => [
								[
									'title' => __( 'Shipping Zones', 'wme-sitebuilder' ),
									'links' => [
										[
											'icon'   => 'Add',
											'title'  => __( 'Set up Shipping Zones', 'wme-sitebuilder' ),
											'url'    => admin_url( 'admin.php?page=wc-settings&tab=shipping' ),
											'target' => '_self',
										],
										[
											'icon'   => 'LocalLibrary',
											'title'  => __( 'WooCommerce: Shipping Zones Docs', 'wme-sitebuilder' ),
											'url'    => 'https://woocommerce.com/document/setting-up-shipping-zones/',
											'target' => '_blank',
										],
									],
								],
								[
									'title' => __( 'Shipping Classes', 'wme-sitebuilder' ),
									'links' => [
										[
											'icon'   => 'Add',
											'title'  => __( 'Set up Shipping Classes', 'wme-sitebuilder' ),
											'url'    => admin_url( 'admin.php?page=wc-settings&tab=shipping&section=classes' ),
											'target' => '_self',
										],
										[
											'icon'   => 'School',
											'title'  => __( 'Tutorial: Shipping Classes', 'wme-sitebuilder' ),
											'url'    => 'wp101:woocommerce-shipping-classes',
											'target' => '_self',
										],
										[
											'icon'   => 'LocalLibrary',
											'title'  => __( 'WooCommerce: Shipping Classes Docs', 'wme-sitebuilder' ),
											'url'    => 'https://woocommerce.com/document/product-shipping-classes/',
											'target' => '_blank',
										],
									],
								],
								[
									'title' => __( 'Shipping Calculations', 'wme-sitebuilder' ),
									'links' => [
										[
											'icon'   => 'Add',
											'title'  => __( 'Set Flat Rate shipping calculations', 'wme-sitebuilder' ),
											'url'    => admin_url( 'admin.php?page=wc-settings&tab=shipping&section=options' ),
											'target' => '_blank',
										],
										[
											'icon'   => 'School',
											'title'  => __( 'Tutorial: Flat Rate Shipping', 'wme-sitebuilder' ),
											'url'    => 'wp101:woocommerce-flat-rate-shipping',
											'target' => '_self',
										],
									],
								],
							],
						],
					],
				],
			],
		];
	}
}
