<?php

namespace Tribe\WME\Sitebuilder\Pages;

use Tribe\WME\Sitebuilder\Cards\FirstTimeConfiguration as FirstTimeConfigurationCard;
use Tribe\WME\Sitebuilder\Cards\GoLive as GoLiveCard;
use Tribe\WME\Sitebuilder\Cards\LookAndFeel as LookAndFeelCard;
use Tribe\WME\Sitebuilder\Concerns\HasAssets;
use Tribe\WME\Sitebuilder\Wizards\FirstTimeConfiguration as FirstTimeConfigurationWizard;
use Tribe\WME\Sitebuilder\Wizards\GoLive as GoLiveWizard;
use Tribe\WME\Sitebuilder\Wizards\LookAndFeel as LookAndFeelWizard;
use Tribe\WmeBackendStarter\Admin_Page as WmeBackendStarterAdmin_Page;

use const Tribe\WME\Sitebuilder\PLUGIN_URL;

class SiteBuilder extends WmeBackendStarterAdmin_Page {

	use HasAssets;

	/**
	 * @var string
	 */
	protected $page_title = 'SiteBuilder';

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
	 * @var null|int|float
	 */
	protected $position = 3;

	/**
	 * @var array
	 */
	protected $cards = [];

	/**
	 * @var array
	 */
	protected $wizards = [];

	/**
	 * Construct.
	 *
	 * @todo remove require_once
	 */
	public function __construct() {
		$this->menu_title = __( 'Set up', 'wme-sitebuilder' );

		parent::__construct();

		$domains  = $this->classDomains();
		$client   = $this->classClient();
		$settings = $this->classSettings();
		$option   = apply_filters( 'sitebuilder_classname_option', null );

		if ( null === $domains || null === $client || null === $settings || null === $option ) {
			trigger_error( 'Class dependencies not provided; unable to proceed.' ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error

			return;
		}

		$this->cards = [
			new FirstTimeConfigurationCard(),
			new LookAndFeelCard(),
			new GoLiveCard(),
		];

		$this->wizards = [
			new FirstTimeConfigurationWizard( $settings ),
			new LookAndFeelWizard(),
			new GoLiveWizard( $domains, $client, $settings ),
		];

		parent::__construct();
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
	 * Action: toplevel_page_sitebuilder/print_scripts.
	 *
	 * Add properties for page headline and description.
	 */
	public function actionPrintScripts() {
		$props = [
			'app_name'    => __( 'Site Builder', 'wme-sitebuilder' ),
			'logo'        => 'sitebuilder-logo.svg',
			'title'       => __( 'Setup your site', 'wme-sitebuilder' ),
			'intro'       => __( 'Our set up wizard will help you get the most out of your site.', 'wme-sitebuilder' ),
			'site_url'    => site_url(),
			'logout_url'  => wp_logout_url(),
			'assets_url'  => PLUGIN_URL . '/wme-sitebuilder/assets/',
			'support_url' => esc_url( 'https://www.nexcess.net/support/' ),
			'page_url'    => add_query_arg( 'page', $this->menu_slug, admin_url( 'admin.php' ) ),
			'cards'       => [],
			'wizards'     => (object) [],
		];

		if ( class_exists( \WP101\API::class ) ) {
			$props['wp101_api_key'] = \WP101\API::get_instance()->get_public_api_key();
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
		$this->enqueueScript( 'wme-sitebuilder-app', 'sitebuilder-app.js', [ 'wp-element', 'underscore', 'wp-api', 'wp-edit-post', 'password-strength-meter' ] );
		$this->enqueueStyle( 'wme-sitebuilder-app', 'sitebuilder-app.css', [], 'screen' );
	}

	/**
	 * Get class for domain changes.
	 *
	 * For Nexcess MAPPS mu-plugin, this should be
	 * \Nexcess\MAPPS\Integrations\DomainChanges.
	 *
	 * @return null|object
	 */
	protected function classDomains() {
		$instance = apply_filters( 'sitebuilder_class_domains', null );

		if ( ! is_object( $instance ) ) {
			return null;
		}

		if ( ! is_callable( [ $instance, 'formatDomain' ] ) ) {
			return null;
		}

		return $instance;
	}

	/**
	 * Get class for client.
	 *
	 * For Nexcess MAPPS mu-plugin, this should be
	 * \Nexcess\MAPPS\Services\MappsApiClient.
	 *
	 * @return null|object
	 */
	protected function classClient() {
		$instance = apply_filters( 'sitebuilder_class_client', null );

		if ( ! is_object( $instance ) ) {
			return null;
		}

		if ( ! is_callable( [ $instance, 'checkDomainUsable' ] ) ) {
			return null;
		}

		return $instance;
	}

	/**
	 * Get class for settings.
	 *
	 * For Nexcess MAPPS mu-plugin, this should be
	 * \Nexcess\MAPPS\Settings.
	 *
	 * @return null|object
	 */
	protected function classSettings() {
		$instance = apply_filters( 'sitebuilder_class_settings', null );

		if ( ! is_object( $instance ) ) {
			return null;
		}

		if ( ! is_callable( [ $instance, 'getSetting' ] ) ) {
			return null;
		}

		return $instance;
	}
}
