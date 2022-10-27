<?php

namespace Tribe\WME\Sitebuilder\Modules;

use Tribe\WME\Sitebuilder\Cards\PaymentGateways as PaymentGatewaysCard;
use Tribe\WME\Sitebuilder\Concerns\HasAssets;
use Tribe\WME\Sitebuilder\Concerns\HasWordPressDependencies;
use Tribe\WME\Sitebuilder\Container;
use Tribe\WME\Sitebuilder\Contracts\LoadsConditionally;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\PayPal;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\Stripe;
use Tribe\WME\Sitebuilder\Wizards\PaymentGatewayPayPal as PaymentGatewayPayPalWizard;
use Tribe\WME\Sitebuilder\Wizards\PaymentGatewayStripe as PaymentGatewayStripeWizard;
use Tribe\WME\Sitebuilder\Wizards\Shipping as ShippingWizard;
use Tribe\WME\Sitebuilder\Wizards\StoreSetup as StoreSetupWizard;

class StoreDetails extends Module implements LoadsConditionally {

	use HasAssets;
	use HasWordPressDependencies;

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
	protected $icon_url = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuODMzMzEgMTRDNC45MTY2NSAxNCA0LjE3NDk4IDE0Ljc1IDQuMTc0OTggMTUuNjY2N0M0LjE3NDk4IDE2LjU4MzQgNC45MTY2NSAxNy4zMzM0IDUuODMzMzEgMTcuMzMzNEM2Ljc0OTk4IDE3LjMzMzQgNy40OTk5OCAxNi41ODM0IDcuNDk5OTggMTUuNjY2N0M3LjQ5OTk4IDE0Ljc1IDYuNzQ5OTggMTQgNS44MzMzMSAxNFpNMC44MzMzMTMgMC42NjY2ODdWMi4zMzMzNUgyLjQ5OTk4TDUuNDk5OTggOC42NTgzNUw0LjM3NDk4IDEwLjdDNC4yNDE2NSAxMC45MzM0IDQuMTY2NjUgMTEuMjA4NCA0LjE2NjY1IDExLjVDNC4xNjY2NSAxMi40MTY3IDQuOTE2NjUgMTMuMTY2NyA1LjgzMzMxIDEzLjE2NjdIMTUuODMzM1YxMS41SDYuMTgzMzFDNi4wNjY2NSAxMS41IDUuOTc0OTggMTEuNDA4NCA1Ljk3NDk4IDExLjI5MTdMNS45OTk5OCAxMS4xOTE3TDYuNzQ5OTggOS44MzMzNUgxMi45NTgzQzEzLjU4MzMgOS44MzMzNSAxNC4xMzMzIDkuNDkxNjkgMTQuNDE2NiA4Ljk3NTAyTDE3LjQgMy41NjY2OUMxNy40NjY2IDMuNDUwMDIgMTcuNSAzLjMwODM1IDE3LjUgMy4xNjY2OUMxNy41IDIuNzA4MzUgMTcuMTI1IDIuMzMzMzUgMTYuNjY2NiAyLjMzMzM1SDQuMzQxNjVMMy41NTgzMSAwLjY2NjY4N0gwLjgzMzMxM1pNMTQuMTY2NiAxNEMxMy4yNSAxNCAxMi41MDgzIDE0Ljc1IDEyLjUwODMgMTUuNjY2N0MxMi41MDgzIDE2LjU4MzQgMTMuMjUgMTcuMzMzNCAxNC4xNjY2IDE3LjMzMzRDMTUuMDgzMyAxNy4zMzM0IDE1LjgzMzMgMTYuNTgzNCAxNS44MzMzIDE1LjY2NjdDMTUuODMzMyAxNC43NSAxNS4wODMzIDE0IDE0LjE2NjYgMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';

	/**
	 * @var null|int
	 */
	protected $position = 3;

	/**
	 * Only load this module if WooCommerce is installed.
	 *
	 * @return bool True if the extension should load, false otherwise.
	 */
	public function shouldLoad() {
		return $this->isPluginActive( 'woocommerce/woocommerce.php' );
	}

	/**
	 * Setup the Module.
	 */
	public function setup() {
		$this->menu_title = __( 'Store Details', 'wme-sitebuilder' );

		$this->wizards = [
			Container::getInstance()->make( StoreSetupWizard::class ),
			Container::getInstance()->make( ShippingWizard::class ),
		];

		$this->addPaymentCardsWizards();

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
	 * Add payment cards and wizards.
	 */
	protected function addPaymentCardsWizards() {
		$plugins = [];

		$stripe = new Stripe();
		$paypal = new PayPal();

		if ( ! $stripe->isInstalled() || $stripe->isVersionSupported() ) {
			$plugins['stripe'] = $stripe;
			$this->wizards[]   = new PaymentGatewayStripeWizard( $stripe );
		}

		if ( ! $paypal->isInstalled() || $paypal->isVersionSupported() ) {
			$plugins['paypal'] = $paypal;
			$this->wizards[]   = new PaymentGatewayPayPalWizard( $paypal );
		}

		if ( empty( $plugins ) ) {
			return;
		}

		$this->cards[] = new PaymentGatewaysCard( $plugins );
	}

	/**
	 * Action: toplevel_page_sitebuilder-store-details/print_scripts.
	 *
	 * Add properties for page headline and description.
	 */
	public function actionPrintScripts() {
		$props = [
			'app_name'    => __( 'Store', 'wme-sitebuilder' ),
			'logo'        => 'sitebuilder-logo.svg',
			'title'       => __( 'Setup your site', 'wme-sitebuilder' ),
			'intro'       => __( 'Our set up wizard will help you get the most out of your site.', 'wme-sitebuilder' ),
			'site_url'    => site_url(),
			'logout_url'  => wp_logout_url(),
			'assets_url'  => $this->getAssetSource( 'store-details/' ),
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
	 * Action: toplevel_page_sitebuilder-store-details/print_scripts:15.
	 *
	 * Print the JavaScript include and dependencies.
	 */
	public function actionPrintScripts_15() {
		$this->enqueueScript( 'wme-sitebuilder-store-details', 'store-details.js', [ 'wp-element', 'underscore', 'wp-api', 'wp-edit-post' ] );
	}
}
