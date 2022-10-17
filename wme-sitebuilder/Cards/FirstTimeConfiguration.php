<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Wizards\Wizard;

class FirstTimeConfiguration extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $card_slug = 'ftc';

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
	 * Properties for card.
	 *
	 * @return array
	 */
	public function props() {
		return [
			'id'        => 'ftc',
			'title'     => __( 'Set up your site', 'wme-sitebuilder' ),
			'intro'     => __( 'This is where the fun begins.', 'wme-sitebuilder' ),
			'completed' => $this->wizard->isComplete(),
			'time'      => __( '5 Minutes', 'wme-sitebuilder' ),
			'rows'      => [
				[
					'id'         => 'ftc-wizard',
					'type'       => 'task',
					'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
					'title'      => __( 'Site Name, Logo & Store Details', 'wme-sitebuilder' ),
					'intro'      => __( 'Tell us a little bit about your site.', 'wme-sitebuilder' ),
					'icon'       => 'setup-icon-setup.png',
					'wizardHash' => '/wizard/ftc',
				],
			],
		];
	}
}
