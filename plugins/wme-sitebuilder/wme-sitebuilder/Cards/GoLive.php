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
			'navTitle'     => __( 'Domain', 'wme-sitebuilder' ),
			'title'     => __( 'Your Domain', 'wme-sitebuilder' ),
			'intro'     => __( 'Vivamus sagittis lacus vel augue laoreet.', 'wme-sitebuilder' ),
			'completed' => $this->wizard->isComplete(),
			'rows'      => [
				[
					'id'   => 'launch-domain-status',
					'type' => 'launch-domain-status',
				],
			],
			'footer' => $this->footer(),
		];

		if ( ! $this->wizard->isComplete() ) {
			$details['rows'][] = [
				'id'         => 'site-domain-wizard',
				'type'       => 'task',
				'title'      => __( 'Purchase a domain', 'wme-sitebuilder' ),
				'intro'      => __( 'Don\'t own a domain? Purchase a custom domain for your site.', 'wme-sitebuilder' ),
				'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
				'wizardHash' => '/wizard/go-live-purchase',
			];

			$details['rows'][] = [
				'id'         => 'site-domain-wizard',
				'type'       => 'task',
				'title'      => __( 'Connect your domain', 'wme-sitebuilder' ),
				'intro'      => __( 'Already own a domain? Update your store URL with your custom domain.', 'wme-sitebuilder' ),
				'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
				'wizardHash' => '/wizard/go-live-connect',
			];
		}

		return $details;
	}

	protected function footer() {
		return [
			'collapsible' => false,
			'rows'        => [
				[
					'type'  => 'links',
					'title' => __( 'Need help?', 'wme-sitebuilder' ),
					'links' => [
						[
							'label'  => __( 'Our Guide To Going Live', 'wme-sitebuilder' ),
							'target' => '__blank',
							'href'   => 'https://www.nexcess.net/help/guide-to-going-live-with-storebuilder/',
						]
					]
				]
			]
		];
	}
}
