<?php

namespace Tribe\WME\Sitebuilder\Plugins\PaymentGateways;

use Tribe\WME\Sitebuilder\Plugins\Plugin;

/**
 * @property string[] $keys
 * @property string[] $oauth_urls
 * @property string   $slug
 * @property string   $supported_version
 */
class PayPal extends Plugin {

	/**
	 * @var string
	 */
	protected $slug = 'woocommerce-paypal-payments';

	/**
	 * @var string
	 */
	protected $file = 'woocommerce-paypal-payments.php';

	/**
	 * @var string
	 */
	protected $supported_version = '1.9.4';

	/**
	 * @var string
	 */
	protected $admin_url = '';

	/**
	 * @var string[]
	 */
	protected $oauth_urls = [];

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
		$this->admin_url = admin_url( 'admin.php?page=wc-settings&tab=checkout&section=ppcp-gateway' );

		parent::__construct();

		$this->registerHooks();
	}

	/**
	 * Register hooks.
	 */
	public function registerHooks() {
		add_action( 'woocommerce_paypal_payments_built_container', [ $this, 'action__woocommerce_paypal_payments_built_container' ] );
	}

	/**
	 * Get properties for card row.
	 *
	 * @return array
	 */
	public function card_row_props() {
		return [
			'id'          => 'payments-paypal',
			'type'        => 'action',
			'title'       => __( 'Connect PayPal', 'wme-sitebuilder' ),
			'intro'       => __( 'Receive payments via PayPal.', 'wme-sitebuilder' ),
			'icon'        => 'setup-icon-paypal.png',
			'disableText' => __( 'Manage PayPal', 'wme-sitebuilder' ),
			'adminUrl'    => $this->admin_url,
			'connected'   => $this->connected,
			'button'      => [
				'label'           => __( 'Connect PayPal', 'wme-sitebuilder' ),
				'backgroundColor' => '#172C70',
			],
			'wizardHash'  => '/wizard/payments-paypal',
		];
	}

	/**
	 * Get properties for footer message.
	 *
	 * @return array
	 */
	public function card_footer_props() {
		return [
			'title'    => __( 'Help with Paypal', 'wme-sitebuilder' ),
			'url'      => 'wp101:woocommerce-paypal-standard',
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
	 * Action: woocommerce_paypal_payments_built_container.
	 *
	 * - Capture the oAuth URL for PayPal.
	 * - Identify if PayPal is connected and set two properties.
	 * - Capture PayPal API keys.
	 *
	 * @param \Psr\Container\ContainerInterface $container
	 *
	 * @see WooCommerce\PayPalCommerce\WcGateway\Settings\SettingsListener::listen_for_merchant_id()
	 * @see WooCommerce\PayPalCommerce\WcGateway\Settings\SettingsListener::read_active_credentials_from_settings()
	 */
	public function action__woocommerce_paypal_payments_built_container( $container ) {
		if ( 'woocommerce_paypal_payments_built_container' !== current_action() ) {
			return;
		}

		$onboarding = $container->get( 'onboarding.render' );
		$settings   = $container->get( 'wcgateway.settings' );

		$this->connected = ( $settings->has( 'client_id' ) && ! empty( $settings->get( 'client_id' ) ) );

		$this->oauth_urls = [
			'advanced' => $onboarding->get_signup_link( true, [ 'PPCP' ] ),
			'standard' => $onboarding->get_signup_link( true, [ 'EXPRESS_CHECKOUT' ] ),
		];

		$this->keys = [
			'email_address' => $settings->has( 'merchant_email_production' ) ? $settings->get( 'merchant_email_production' ) : '',
			'merchant_id'   => $settings->has( 'merchant_id_production' ) ? $settings->get( 'merchant_id_production' ) : '',
			'client_id'     => $settings->has( 'client_id_production' ) ? $settings->get( 'client_id_production' ) : '',
		];
	}
}
