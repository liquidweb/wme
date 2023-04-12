<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Wizards\FirstTimeConfiguration as Wizard;

class Goals extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $card_slug = 'goals';

	/**
	 * @var Wizard
	 */
	protected $wizard;

	/**
	 * Construct.
	 *
	 * @param Wizard $wizard
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
		return [
			'id'        => 'goals',
			'navTitle'  => __( 'Your Goals', 'wme-sitebuilder' ),
			'title'     => __( 'Your Goals', 'wme-sitebuilder' ),
			'intro'     => __( 'Get started on your goals by completing a few tasks.', 'wme-sitebuilder' ),
			'completed' => $this->is_complete(),
			'rows'      => [
				[
					'id'         => 'goals-wizard',
					'type'       => 'task',
					'title'      => __( 'Set your goals', 'wme-sitebuilder' ),
					'intro'      => __( 'Set your goals for your website.', 'wme-sitebuilder' ),
					'wizardHash' => '/wizard/ftc?step=3',
				]
			]
		];
	}

	/**
	 * Is complete.
	 *
	 * @return bool
	 */
	protected function is_complete() {
		return ! empty( $this->wizard->getGoals() );
	}

}
