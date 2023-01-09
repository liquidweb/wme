<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Plugins\Plugin;

class PaymentGateways extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder-store-details';

	/**
	 * @var string
	 */
	protected $card_slug = 'payment-gateways';

	/**
	 * @var object[]
	 */
	protected $payment_plugins;

	/**
	 * Construct.
	 *
	 * @param array<Plugin> $payment_plugins
	 */
	public function __construct( $payment_plugins ) {
		$this->payment_plugins = $payment_plugins;

		parent::__construct();
	}

	/**
	 * Get card properties.
	 *
	 * @return array
	 */
	public function props() {
		return [
			'id'        => 'payment-gateways',
			'title'     => __( 'Configure payment', 'wme-sitebuilder' ),
			'intro'     => __( 'Don\'t leave money on the table.', 'wme-sitebuilder' ),
			'completed' => false,
			'time'      => '',
			'rows'      => $this->rows(),
			'footers'   => [
				[
					'id'       => 'gateway-help',
					'type'     => 'gateway-help',
					'title'    => __( 'Need help with payments?', 'wme-sitebuilder' ),
					'message'  => '',
					'messages' => $this->footer_messages(),
				],
			],
		];
	}

	/**
	 * Get card rows.
	 *
	 * @return array[]
	 */
	protected function rows() {
		$rows = [];

		foreach ( $this->payment_plugins as $plugin ) {
			if ( ! is_callable( [ $plugin, 'card_row_props' ] ) ) {
				continue;
			}

			$rows[] = $plugin->card_row_props();
		}

		return $rows;
	}

	/**
	 * Get card footer messages.
	 *
	 * @return array[]
	 */
	protected function footer_messages() {
		$footer = [];

		foreach ( $this->payment_plugins as $plugin ) {
			if ( ! is_callable( [ $plugin, 'card_footer_props' ] ) ) {
				continue;
			}

			$footer[] = $plugin->card_footer_props();
		}

		return $footer;
	}
}
