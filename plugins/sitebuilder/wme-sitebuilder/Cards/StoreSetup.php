<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Wizards\Wizard;

class StoreSetup extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder-store-details';

	/**
	 * @var string
	 */
	protected $card_slug = 'store-setup';

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
			'id'        => 'store-setup',
			'title'     => __( 'Store Setup', 'wme-sitebuilder' ),
			'intro'     => __( 'This is where the fun begins.', 'wme-sitebuilder' ),
			'completed' => $this->wizard->isComplete(),
			'time'      => __( '5 Minutes', 'wme-sitebuilder' ),
			'rows'      => [
				[
					'id'         => 'store-setup-wizard',
					'type'       => 'task',
					'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
					'title'      => __( 'Set your currency, address, and store type.', 'wme-sitebuilder' ),
					'intro'      => __( 'Tell us a little bit about your store.', 'wme-sitebuilder' ),
					'icon'       => 'setup-icon-store-setup.png',
					'wizardHash' => '/wizard/store-setup',
				],
			],
		];
	}
}
