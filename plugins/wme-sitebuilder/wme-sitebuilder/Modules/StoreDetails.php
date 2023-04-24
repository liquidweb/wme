<?php

namespace Tribe\WME\Sitebuilder\Modules;

use Tribe\WME\Sitebuilder\Cards\PaymentGateways as PaymentGatewaysCard;
use Tribe\WME\Sitebuilder\Concerns\HasAssets;
use Tribe\WME\Sitebuilder\Concerns\HasWordPressDependencies;
use Tribe\WME\Sitebuilder\Contracts\Factory;
use Tribe\WME\Sitebuilder\Contracts\LoadsConditionally;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\PayPal;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\Stripe;
use Tribe\WME\Sitebuilder\Wizards\PaymentGatewayPayPal;
use Tribe\WME\Sitebuilder\Wizards\PaymentGatewayStripe;
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
	 * @var null|int
	 */
	protected $position = 3;

	/**
	 * @var \Tribe\WME\Sitebuilder\Contracts\Factory
	 */
	protected $factory;

	public function __construct( array $cards, Factory $factory ) {
		$this->factory = $factory;

		parent::__construct( $cards );
	}

	/**
	 * Only load this module if WooCommerce is installed.
	 *
	 * @return bool True if the extension should load, false otherwise.
	 */
	public function shouldLoad() {
		return $this->isPluginActive( 'woocommerce/woocommerce.php' );
	}

	/**
	 * Set up the Module.
	 */
	public function setup() {
		$this->menu_title = __( 'Store Details', 'wme-sitebuilder' );

		$this->wizards = [
			$this->factory->make( StoreSetupWizard::class ),
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
			$this->wizards[]   = $this->factory->make( PaymentGatewayStripe::class );
		}

		if ( ! $paypal->isInstalled() || $paypal->isVersionSupported() ) {
			$plugins['paypal'] = $paypal;
			$this->wizards[]   = $this->factory->make( PaymentGatewayPayPal::class );
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
			'logo'        => $this->get_logo(),
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
