<?php

namespace Tribe\WME\Sitebuilder\Modules;

use Tribe\WME\Sitebuilder\Concerns\HasAssets;

class SiteBuilder extends Module {

	use HasAssets;

	/**
	 * @var string
	 */
	protected $page_title = 'Site Setup';

	/**
	 * @var string
	 */
	protected $menu_title = 'Site Setup';

	/**
	 * @var string
	 */
	protected $capability = 'manage_options';

	/**
	 * @var string
	 */
	protected $menu_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $icon_url = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxOCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuMDAwMDggOC44MzMzM0MyLjE2Njc1IDguODMzMzMgMC42NjY3NDggMTAuMzMzMyAwLjY2Njc0OCAxMi4xNjY3QzAuNjY2NzQ4IDE0IDIuMTY2NzUgMTUuNSA0LjAwMDA4IDE1LjVDNS44MzM0MSAxNS41IDcuMzMzNDIgMTQgNy4zMzM0MiAxMi4xNjY3QzcuMzMzNDIgMTAuMzMzMyA1LjgzMzQxIDguODMzMzMgNC4wMDAwOCA4LjgzMzMzWk05LjAwMDA4IDAuNUM3LjE2Njc1IDAuNSA1LjY2Njc1IDIgNS42NjY3NSAzLjgzMzMzQzUuNjY2NzUgNS42NjY2NyA3LjE2Njc1IDcuMTY2NjcgOS4wMDAwOCA3LjE2NjY3QzEwLjgzMzQgNy4xNjY2NyAxMi4zMzM0IDUuNjY2NjcgMTIuMzMzNCAzLjgzMzMzQzEyLjMzMzQgMiAxMC44MzM0IDAuNSA5LjAwMDA4IDAuNVpNMTQuMDAwMSA4LjgzMzMzQzEyLjE2NjcgOC44MzMzMyAxMC42NjY3IDEwLjMzMzMgMTAuNjY2NyAxMi4xNjY3QzEwLjY2NjcgMTQgMTIuMTY2NyAxNS41IDE0LjAwMDEgMTUuNUMxNS44MzM0IDE1LjUgMTcuMzMzNCAxNCAxNy4zMzM0IDEyLjE2NjdDMTcuMzMzNCAxMC4zMzMzIDE1LjgzMzQgOC44MzMzMyAxNC4wMDAxIDguODMzMzNaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';

	/**
	 * @var null|int
	 */
	protected $position = 3;

	/**
	 * Setup the Module.
	 */
	public function setup() {
		$this->menu_title = __( 'Site Setup', 'wme-sitebuilder' );

		parent::setup();
	}

	/**
	 * Register hook callbacks.
	 */
	public function register_hooks() {
		parent::register_hooks();

		add_action( sprintf( '%s/print_scripts', $this->menu_slug ), [ $this, 'actionPrintScripts' ], 5 );
		add_action( sprintf( '%s/print_scripts', $this->menu_slug ), [ $this, 'actionPrintScripts_15' ], 15 );
	}

	/**
	 * Action: toplevel_page_sitebuilder:print_scripts.
	 *
	 * Add properties for page headline and description.
	 */
	public function actionPrintScripts() {
		$props = [
			'app_name'    => __( 'Site Setup', 'wme-sitebuilder' ),
			'logo'        => $this->get_logo(),
			'title'       => __( 'Setup your site', 'wme-sitebuilder' ),
			'site_url'    => site_url(),
			'page_url'    => add_query_arg( 'page', $this->menu_slug, admin_url( 'admin.php' ) ),
			'assets_url'  => $this->getAssetSource( 'sitebuilder/' ),
			'support_url' => esc_url( 'https://www.nexcess.net/support/' ),
			'cards'       => [],
			'dynamic_css' => apply_filters( 'kadence_editor_dynamic_css', '' ),
			'wizards'     => (object) [],
			'ui_theme'	  => $this->get_active_ui_theme(),
		];

		if ( class_exists( \WP101\API::class ) ) {
			$key = \WP101\API::get_instance()->get_public_api_key();

			if ( ! is_wp_error( $key ) ) {
				$props['wp101_api_key'] = $key;
			}
		}

		printf(
			'<script>window[%s] = %s</script>' . PHP_EOL,
			wp_json_encode( str_replace( '-', '_', (string) $this->menu_slug ) ),
			wp_json_encode( $props )
		);
	}

	/**
	 * Action: toplevel_page_sitebuilder/print_scripts:15.
	 *
	 * Print the JavaScript include and dependencies.
	 */
	public function actionPrintScripts_15() {
		$this->enqueueScript( 'wme-sitebuilder', 'sitebuilder.js', [ 'wp-element', 'underscore', 'wp-api', 'wp-edit-post', 'password-strength-meter' ] );
	}
}
