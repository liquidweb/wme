<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Concerns\StoresData;

class GoogleAnalytics extends Card {

	use StoresData;

	const DATA_STORE_NAME = 'wme_sitebuilder_google_analytics';

	/**
	 * @var string
	 */
	protected $ajax_action = 'sitebuilder-google-analytics';

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'site-settings';

	/**
	 * @var string
	 */
	protected $card_slug = 'google-analytics';

	/**
	 * Construct.
	 *
	 */
	public function __construct() {
		parent::__construct();

		$this->add_ajax_action( 'save', [ $this, 'save' ] );
	}

	/**
	 * Get properties.
	 *
	 * @return array
	 */
	public function props() {
		$details = [
			'id'        => 'google-analytics',
			'navTitle'     => __( 'Google Analytics', 'wme-sitebuilder' ),
			'title'     => __( 'Google Analytics', 'wme-sitebuilder' ),
			'intro'     => __( 'Google Analytics enables you to track the visitors to your site and generate reports.', 'wme-sitebuilder' ),
			'code'      => html_entity_decode( $this->getData()->get( 'code' ) ?? '' ),
		];

		return $details;
	}

	/**
	 * Escape the code and save it to the database.
	 *
	 * @return array
	 */
	public function save() {
		$code = $_REQUEST['code'] ?? '';

		// Escape the code.
		$code = esc_html( $code );

		if ( empty( $code ) ) {
			return wp_send_json_error(
				[
					'code' => $code,
				]
			);
		}

		// Save the code.
		$this->getData()->set( 'code', $code )->save();

		return wp_send_json_success(
			[
				'code' => $this->getData()->get( 'code' ),
			]
		);
	}
}
