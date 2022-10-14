<?php

namespace Tribe\WME\Sitebuilder\Pages;

use Tribe\WME\Sitebuilder\Cards\ManageProducts as ManageProductsCard;
use Tribe\WME\Sitebuilder\Cards\PaymentGateways as PaymentGatewaysCard;
use Tribe\WME\Sitebuilder\Cards\Shipping as ShippingCard;
use Tribe\WME\Sitebuilder\Cards\StoreSetup as StoreSetupCard;
use Tribe\WME\Sitebuilder\Concerns\HasAssets;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\PayPal;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\Stripe;
use Tribe\WME\Sitebuilder\Plugins\Shipping as ShippingPlugins;
use Tribe\WME\Sitebuilder\Wizards\PaymentGatewayPayPal as PaymentGatewayPayPalWizard;
use Tribe\WME\Sitebuilder\Wizards\PaymentGatewayStripe as PaymentGatewayStripeWizard;
use Tribe\WME\Sitebuilder\Wizards\Shipping as ShippingWizard;
use Tribe\WME\Sitebuilder\Wizards\StoreSetup as StoreSetupWizard;
use Tribe\WmeBackendStarter\Admin_Page;

use const Tribe\WME\Sitebuilder\PLUGIN_URL;

class StoreDetails extends Admin_Page {

	use HasAssets;

	/**
	 * @var string
	 */
	protected $page_title = 'Store Details';

	/**
	 * @var string
	 */
	protected $menu_title = 'Store Details';

	/**
	 * @var string
	 */
	protected $capability = 'manage_options';

	/**
	 * @var string
	 */
	protected $menu_slug = 'sitebuilder-store-details';

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
	 */
	public function __construct() {
		$this->menu_title = __( 'Store Details', 'wme-sitebuilder' );

		$classname_console_command = apply_filters( 'sitebuilder_classname_console_command', null );
		$classname_option          = apply_filters( 'sitebuilder_classname_option', null );

		if ( null === $classname_option ) {
			trigger_error( 'Class dependencies not provided; unable to proceed.' ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error

			return;
		}

		$this->cards = [
			new StoreSetupCard(),
			new ManageProductsCard(),
		];

		$this->wizards = [
			new StoreSetupWizard(),
		];

		if ( ! empty( $classname_console_command ) ) {
			$shipping_plugins = new ShippingPlugins();

			$this->cards[]   = new ShippingCard( $shipping_plugins );
			$this->wizards[] = new ShippingWizard( $shipping_plugins );

			$this->addPaymentCardsWizards();
		} else {
			trigger_error( 'Class name for performing console commands is required for payment and shipping wizards.', E_USER_NOTICE ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
		}

		parent::__construct();
	}

	/**
	 * Add payment cards and wizards.
	 */
	protected function addPaymentCardsWizards() {
		$cards = [];

		$stripe = new Stripe();
		$paypal = new PayPal();

		if ( ! $stripe->isPluginInstalled() || $stripe->isVersionSupported() ) {
			$cards['stripe'] = $stripe;
			$this->wizards[] = new PaymentGatewayStripeWizard( $stripe );
		}

		if ( ! $paypal->isPluginInstalled() || $paypal->isVersionSupported() ) {
			$cards['paypal'] = $paypal;
			$this->wizards[] = new PaymentGatewayPayPalWizard( $paypal );
		}

		if ( empty( $cards ) ) {
			return;
		}

		$this->cards[] = new PaymentGatewaysCard( $cards );
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
	 * Action: toplevel_page_sitebuilder-store-details/print_scripts.
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
	 * Action: toplevel_page_sitebuilder-store-details/print_scripts:15.
	 *
	 * Print the JavaScript include and dependencies.
	 */
	public function actionPrintScripts_15() {
		$this->enqueueScript( 'wme-sitebuilder-storebuilderapp', 'storebuilder-app.js', [ 'wp-element', 'underscore', 'wp-api', 'wp-edit-post' ] );
		$this->enqueueStyle( 'wme-sitebuilder-storebuilderapp', 'storebuilder-app.css', [], 'screen' );
	}
}
