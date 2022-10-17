<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Wizards\Wizard;

class GoLive extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

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
			'title'     => __( 'Go Live with a domain', 'wme-sitebuilder' ),
			// phpcs:ignore Generic.Files.LineLength.TooLong
			'intro'     => __( 'Go live with a custom domain, whether you purchased with Nexcess or elsewhere.', 'wme-sitebuilder' ),
			'completed' => $this->wizard->isComplete(),
			'time'      => $this->wizard->isComplete() ? __( 'Complete', 'wme-sitebuilder' ) : '',
			'rows'      => [
				[
					'id'   => 'launch-domain-status',
					'type' => 'launch-domain-status',
				],
			],
		];

		if ( ! $this->wizard->isComplete() ) {
			$details['rows'][] = [
				'id'         => 'site-domain-wizard',
				'type'       => 'task',
				'title'      => __( 'Publish your site with a custom domain', 'wme-sitebuilder' ),
				'intro'      => __( 'Update your store URL with a custom domain you own', 'wme-sitebuilder' ),
				'icon'       => 'setup-icon-launch.png',
				'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
				'wizardHash' => '/wizard/go-live',
			];
		}

		return $details;
	}
}
