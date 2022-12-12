<?php

namespace Tribe\WME\Sitebuilder\Modules;

use Tribe\WME\Sitebuilder\Concerns\HasAssets;

class SiteBuilder extends Module {

	use HasAssets;

	/**
	 * @var string
	 */
	protected $page_title = 'Site Details';

	/**
	 * @var string
	 */
	protected $menu_title = 'Set up';

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
	protected $icon_url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNhN2FhYWQiIHZpZXdCb3g9Ii0zIC00IDEzIDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0zLjQ2MTYgMTUuMjU4aC0wLjgzMzMzbDAuODMzMzMtNS44MzMzaC0yLjkxNjdjLTAuNDgzMzMgMC0wLjQ3NS0wLjI2NjY3LTAuMzE2NjctMC41NSAwLjE1ODMzLTAuMjgzMzMgMC4wNDE2NjctMC4wNjY2NyAwLjA1ODMzNC0wLjEgMS4wNzUtMS45IDIuNjkxNy00LjczMzMgNC44NDE3LTguNTE2N2gwLjgzMzMzbC0wLjgzMzMzIDUuODMzM2gyLjkxNjdjMC40MDgzNCAwIDAuNDY2NjcgMC4yNzUgMC4zOTE2NyAwLjQyNWwtMC4wNTgzMyAwLjEyNWMtMy4yODMzIDUuNzQxNi00LjkxNjcgOC42MTY2LTQuOTE2NyA4LjYxNjZ6IiBmaWxsPSIjYTdhYWFkIi8+PC9zdmc+';

	/**
	 * @var null|int
	 */
	protected $position = 3;

	/**
	 * Setup the Module.
	 */
	public function setup() {
		$this->menu_title = __( 'Set up', 'wme-sitebuilder' );

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
			'app_name'    => __( 'Site Details', 'wme-sitebuilder' ),
			'logo'        => 'sitebuilder-logo.svg',
			'title'       => __( 'Setup your site', 'wme-sitebuilder' ),
			'intro'       => __( 'Our set up wizard will help you get the most out of your site.', 'wme-sitebuilder' ),
			'site_url'    => site_url(),
			'logout_url'  => wp_logout_url(),
			'assets_url'  => $this->getAssetSource( 'sitebuilder/' ),
			'support_url' => esc_url( 'https://www.nexcess.net/support/' ),
			'page_url'    => add_query_arg( 'page', $this->menu_slug, admin_url( 'admin.php' ) ),
			'cards'       => [],
			'wizards'     => (object) [],
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
