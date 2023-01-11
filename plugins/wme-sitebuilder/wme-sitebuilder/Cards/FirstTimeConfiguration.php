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
			'navTitle'  => __( 'The Basics', 'wme-sitebuilder' ),
			'title'     => __( 'Configure the Basics', 'wme-sitebuilder' ),
			'intro'     => __( 'Set up the basics of your site and we\'ll get you started.', 'wme-sitebuilder' ),
			'completed' => $this->wizard->isComplete(),
			'rows'      => [
				[
					'id'         => 'ftc-wizard',
					'type'       => 'task',
					'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
					'title'      => __( 'Site Name, Logo & Details', 'wme-sitebuilder' ),
					'intro'      => __( 'Tell us a little bit about your site.', 'wme-sitebuilder' ),
					'wizardHash' => '/wizard/ftc',
				],
			],
		];
	}
}
