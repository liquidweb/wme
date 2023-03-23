<?php

namespace Tribe\WME\Sitebuilder\Cards;

class GoogleAnalytics extends Card {

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
		];

		return $details;
	}
}
