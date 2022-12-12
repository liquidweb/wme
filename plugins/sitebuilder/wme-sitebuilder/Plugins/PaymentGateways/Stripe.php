<?php

namespace Tribe\WME\Sitebuilder\Plugins\PaymentGateways;

use Tribe\WME\Sitebuilder\Plugins\Plugin;
use WC_Stripe_Connect;

/**
 * @property string[] $keys
 * @property string   $oauth_url
 * @property string   $slug
 * @property string   $supported_version
 */
class Stripe extends Plugin {

	/**
	 * @var string
	 */
	protected $slug = 'woocommerce-gateway-stripe';

	/**
	 * @var string
	 */
	protected $file = 'woocommerce-gateway-stripe.php';

	/**
	 * @var string
	 */
	protected $supported_version = '6.9.0';

	/**
	 * @var string
	 */
	protected $admin_url = '';

	/**
	 * @var string
	 */
	protected $oauth_url = '';

	/**
	 * @var bool
	 */
	protected $connected = false;

	/**
	 * @var string[]
	 */
	protected $keys = [];

	/**
	 * Construct.
	 */
	public function __construct() {
		$this->admin_url = admin_url( 'admin.php?page=wc-settings&tab=checkout&section=stripe' );

		parent::__construct();

		$this->registerHooks();
	}

	/**
	 * Register hooks.
	 */
	public function registerHooks() {
		add_action( 'woocommerce_init', [ $this, 'action__woocommerce_init' ] );
	}

	/**
	 * Get properties for card row.
	 *
	 * @return array
	 */
	public function card_row_props() {
		return [
			'id'          => 'payments-stripe',
			'type'        => 'action',
			'title'       => __( 'Connect Stripe', 'wme-sitebuilder' ),
			'intro'       => __( 'Charge credit cards and pay low merchant fees.', 'wme-sitebuilder' ),
			'icon'        => 'setup-icon-stripe.png',
			'disableText' => __( 'Manage Stripe', 'wme-sitebuilder' ),
			'adminUrl'    => $this->admin_url,
			'connected'   => $this->connected,
			'button'      => [
				'label'           => __( 'Connect Stripe', 'wme-sitebuilder' ),
				'backgroundColor' => '#645FF3',
			],
			'wizardHash'  => '/wizard/payments-stripe',
		];
	}

	/**
	 * Get properties for footer message.
	 *
	 * @return array
	 */
	public function card_footer_props() {
		return [
			'title'    => __( 'Help with Stripe', 'wme-sitebuilder' ),
			'url'      => 'wp101:woocommerce-stripe',
			'target'   => '_self',
			'dashicon' => '',
		];
	}

	/**
	 * Get properties for wizard.
	 *
	 * @return array
	 */
	public function wizard_props() {
		return [
			'plugin' => [
				'active'    => $this->isPluginActive( $this->plugin_path ),
				'adminUrl'  => $this->admin_url,
				'installed' => $this->isPluginInstalled( $this->plugin_path ),
			],
		];
	}

	/**
	 * Action: woocommerce_init.
	 *
	 * - Capture the oAuth URL for Stripe.
	 * - Identify if Stripe is connected and set two properties.
	 * - Capture Stripe API keys.
	 */
	public function action__woocommerce_init() {
		if ( 'woocommerce_init' !== current_action() ) {
			return;
		}

		if ( ! $this->isPluginActive( $this->plugin_path ) ) {
			return;
		}

		if ( ! function_exists( 'woocommerce_gateway_stripe' ) || ! isset( woocommerce_gateway_stripe()->connect ) || ! method_exists( woocommerce_gateway_stripe()->connect, 'is_connected' ) ) {
			return;
		}

		$stripe    = woocommerce_gateway_stripe();
		$connect   = $stripe->connect;
		$connected = $connect->is_connected();
		$oauth_url = $connect->get_oauth_url();
		$options   = get_option( WC_Stripe_Connect::SETTINGS_OPTION, [] );

		if ( is_wp_error( $oauth_url ) ) {
			$oauth_url = '';
		}

		$options = wp_parse_args( $options, [
			'publishable_key' => '',
			'secret_key'      => '',
		] );

		$this->oauth_url = $oauth_url;
		$this->connected = $connected;
		$this->keys      = [
			'publishable' => trim( $options['publishable_key'] ),
			'secret'      => trim( $options['secret_key'] ),
		];
	}
}
