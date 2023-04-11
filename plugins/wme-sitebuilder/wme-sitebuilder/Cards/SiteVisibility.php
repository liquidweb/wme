<?php

namespace Tribe\WME\Sitebuilder\Cards;

class SiteVisibility extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'site-settings';

	/**
	 * @var string
	 */
	protected $card_slug = 'site-visibility';


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
			'id'        => 'site-visibility',
			'navTitle'  => __( 'Site Visibility', 'wme-sitebuilder' ),
			'title'     => __( 'Site Visibility', 'wme-sitebuilder' ),
			'intro'     => __( 'Limit who can access your site online.', 'wme-sitebuilder' ),
		];

		return $details;
	}
}
