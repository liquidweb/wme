<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Wizards\Wizard;

class GoLive extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'site-settings';

	/**
	 * @var string
	 */
	protected $card_slug = 'golive';

	/**
	 * @var \Tribe\WME\Sitebuilder\Wizards\Wizard
	 */
	protected $wizard;

	/**
	 * Construct.
	 *
	 * @param \Tribe\WME\Sitebuilder\Wizards\Wizard $wizard
	 */
	public function __construct( Wizard $wizard ) {
		$this->wizard = $wizard;

		parent::__construct();
	}

	/**
	 * Get properties.
	 *
	 * @return array
	 */
	public function props() {
		$details = [
			'id'        => 'launch-domain',
			'navTitle'     => __( 'Domain', 'wme-sitebuilder' ),
			'title'     => __( 'Your Domain', 'wme-sitebuilder' ),
			'intro'     => __( 'Update your sites domain.', 'wme-sitebuilder' ),
			'completed' => $this->wizard->isComplete(),
		];

		if ( ! $this->wizard->isComplete() ) {
			$details['rows'][] = [
				'id'         => 'site-domain-wizard',
				'type'       => 'task',
				'title'      => __( 'Publish your site with a custom domain', 'wme-sitebuilder' ),
				'intro'      => __( 'Update your site URL with a custom domain you own', 'wme-sitebuilder' ),
				'url'        => 'https://www.nexcess.net/help/guide-to-going-live-with-storebuilder/',
				'target'     => '_blank',
			];
		}

		return $details;
	}
}
