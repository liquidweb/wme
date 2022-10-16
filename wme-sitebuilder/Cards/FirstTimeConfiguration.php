<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Concerns\HasOptions;

class FirstTimeConfiguration extends Card {

	use HasOptions;

	const OPTION_NAME = '_sitebuilder_ftc';

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $card_slug = 'ftc';

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
			'completed' => $this->isComplete(),
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

	/**
	 * Returns true if the FTC has been completed, false if not.
	 *
	 * @return bool
	 */
	public function isComplete() {
		return (bool) $this->getOption()->get( 'complete', false );
	}
}
