<?php

namespace Tribe\WME\Sitebuilder\Cards;

class ManageProducts extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder-store-details';

	/**
	 * @var string
	 */
	protected $card_slug = 'manageproducts';

	/**
	 * Get properties.
	 *
	 * @return array
	 */
	public function props() {
		return [
			'id'        => 'manage-products',
			'title'     => __( 'Manage your products', 'wme-sitebuilder' ),
			'intro'     => __( 'Give the people what they want.', 'wme-sitebuilder' ),
			'completed' => false,
			'time'      => '',
			'rows'      => [
				[
					'id'      => 'manage-products-row-1',
					'type'    => 'columns',
					'title'   => '',
					'intro'   => '',
					'columns' => [
						[
							'title' => __( 'Add Products', 'wme-sitebuilder' ),
							'links' => [
								[
									'icon'   => 'Add',
									'title'  => __( 'Add a new Product', 'wme-sitebuilder' ),
									'url'    => admin_url( 'post-new.php?post_type=product' ),
									'target' => '_self',
								],
								[
									'icon'   => 'LocalLibrary',
									'title'  => __( 'WooCommerce: Managing Products', 'wme-sitebuilder' ),
									'url'    => 'https://woocommerce.com/document/managing-products/',
									'target' => '_blank',
								],
							],
						],
						[
							'title' => __( 'Import Products', 'wme-sitebuilder' ),
							'links' => [
								[
									'icon'   => 'Upload',
									'title'  => __( 'Import products via CSV', 'wme-sitebuilder' ),
									'url'    => admin_url( 'edit.php?post_type=product&page=product_importer' ),
									'target' => '_self',
								],
								[
									'icon'   => 'School',
									'title'  => __( 'Tutorial: Product CSV', 'wme-sitebuilder' ),
									'url'    => 'https://woocommerce.com/document/product-csv-importer-exporter/',
									'target' => '_blank',
								],
								[
									'icon'   => 'Downloading',
									'title'  => __( 'Download sample CSV file', 'wme-sitebuilder' ),
									'url'    => 'https://github.com/woocommerce/woocommerce/blob/master/sample-data/sample_products.csv',
									'target' => '_blank',
								],
							],
						],
						[
							'title' => __( 'Setting Up Taxes', 'wme-sitebuilder' ),
							'links' => [
								[
									'icon'   => 'Add',
									'title'  => __( 'Set Up Tax Rates', 'wme-sitebuilder' ),
									'url'    => admin_url( 'admin.php?page=wc-settings&tab=tax' ),
									'target' => '_self',
								],
								[
									'icon'   => 'School',
									'title'  => __( 'WP 101: Tax Settings', 'wme-sitebuilder' ),
									'url'    => 'wp101:woocommerce-tax-settings',
									'target' => '_self',
								],
								[
									'icon'   => 'Downloading',
									'title'  => __( 'Sample Tax Rate Table', 'wme-sitebuilder' ),
									'url'    => 'https://github.com/woocommerce/woocommerce/blob/master/sample-data/sample_tax_rates.csv',
									'target' => '_blank',
								],
							],
						],
					],
				],
				[
					'id'              => 'learn-product-types',
					'type'            => 'learn-product-types',
					'exampleProducts' => $this->get_example_products(),
				],
			],
		];
	}

	/**
	 * Builds links to WC default product types.
	 *
	 * @return array[] Array with WC Product Examples.
	 */
	protected function get_example_products() {
		return array_filter([
			$this->get_wc_product_type( __( 'Simple', 'wme-sitebuilder' ), 'simple' ),
			$this->get_wc_product_type( __( 'Variable', 'wme-sitebuilder' ), 'variable' ),
			$this->get_wc_product_type( __( 'Grouped', 'wme-sitebuilder' ), 'grouped' ),
			$this->get_wc_product_type( __( 'External', 'wme-sitebuilder' ), 'external' ),
		], 'array_filter');
	}

	/**
	 * Queries WC for a specific product type.
	 *
	 * Queries the latest product stored in the database.
	 *
	 * @param string $title The Link name.
	 * @param string $type  The WC Product type. Defaults are simple, variable, grouped and external.
	 *
	 * @return array The WC Product if found. Empty otherwise.
	 */
	protected function get_wc_product_type( $title, $type ) {
		if ( ! function_exists( 'wc_get_products' ) ) {
			return [];
		}

		$args = [
			'type'  => $type,
			'limit' => '1',
			'order' => 'DESC',
		];

		$products = wc_get_products( $args );

		if ( 0 === count( $products ) ) {
			return [];
		}

		$product = array_shift( $products );

		$url = add_query_arg([
			'post'   => $product->get_id(),
			'action' => 'edit',
		], admin_url());

		return [
			'title' => $title,
			'url'   => $url,
		];
	}
}
