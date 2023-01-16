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
				'id'      => 'flat-rate',
				'type'    => 'task',
				'taskCta' => __( 'Flat Rate Settings', 'wme-sitebuilder' ),
				'title'   => __( 'Flat Rate Shipping', 'wme-sitebuilder' ),
				'intro'   => __( 'Charge a fixed rate of your choosing for shipping.', 'wme-sitebuilder' ),
				'url'     => admin_url( 'admin.php?page=wc-settings&tab=shipping' ),
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
				'id'         => 'shipping-wizard',
				'type'       => 'button',
				'wizardHash' => '/wizard/shipping',
				'title'      => __( 'Add another way to ship', 'wme-sitebuilder' ),
			];
		}

		return [
			'id'        => 'shipping-configuration',
			'title'     => __( 'Configure shipping', 'wme-sitebuilder' ),
			'intro'     => __( 'Offer flat rate shipping and/or set up ShipStation to offer multiple rates.', 'wme-sitebuilder' ),
			'completed' => false,
			'rows'      => $rows,
			'footer'    => [
				'collapsible'      => true,
				'collapsibleLabel' => __( 'Learn more about Shipping', 'wme-sitebuilder' ),
				'rows'             => [
					[
						'type'      => 'learn-types',
						'title'     => 'Is this needed here?',
						'overline'  => __( '3 Minutes', 'wme-sitebuilder' ),
						'headline'  => __( 'Understanding Flat Rate Shipping in Storebuilder', 'wme-sitebuilder' ),
						'videoData' => [
							'placeholderImage' => 'setup-shipping-poster.png',
							'ariaLabel'        => __( 'Click to play video', 'wme-sitebuilder' ),
							'src'              => 'https://www.youtube.com/embed/EXMe2i7OSQM',
							'description'      => __( 'When setting up shipping in StoreBuilder, there are three concepts to understand: Flat Rate Shipping, Shipping Zones, and Shipping Classes. This video describes each and how they interact to ensure customers are charged correctly to ship their purchases.', 'wme-sitebuilder' ),
						]
					],
					[
						'type'        => 'columns',
						'gridColumns' => 3,
						'columns'     => [
							[
								'heading' => __( 'Shipping Zones', 'wme-sitebuilder' ),
								'list'    => [
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
								'heading' => __( 'Shipping Classes', 'wme-sitebuilder' ),
								'list'    => [
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
								'heading' => __( 'Shipping Calculations', 'wme-sitebuilder' ),
								'list'    => [
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
						]
					]
				],
			],
		];
	}
}
