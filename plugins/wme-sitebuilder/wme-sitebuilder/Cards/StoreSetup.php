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
			'title'     => __( 'Store Details', 'wme-sitebuilder' ),
			'intro'     => __( 'This is where the fun begins.', 'wme-sitebuilder' ),
			'rows'      => [
				[
					'id'         => 'store-setup-wizard',
					'type'       => 'task',
					'title'      => __( 'Set your currency, address, and store type.', 'wme-sitebuilder' ),
					'intro'      => __( 'Tell us a little bit about your store.', 'wme-sitebuilder' ),
					'wizardHash' => '/wizard/store-setup',
				],
			],
		];
	}
}
