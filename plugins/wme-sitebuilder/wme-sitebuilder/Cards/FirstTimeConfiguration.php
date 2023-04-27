<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Wizards\FirstTimeConfiguration as Wizard;

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
	 * Properties for card.
	 *
	 * @return array
	 */
	public function props() {
		$props = [
			'id'        => 'siteDetails',
			'navTitle'  => __( 'Site Identity', 'wme-sitebuilder' ),
			'title'     => __( 'Manage Site Identity', 'wme-sitebuilder' ),
			'intro'     => __( 'Update your logo, company name and tagline.', 'wme-sitebuilder' ),
			'completed' => false,
			'rows'      => [
				[
					'id'      => 'siteDetails-1',
					'type'    => 'task',
					'title'   => __( 'Edit Site Name, Tagline & Logo', 'wme-sitebuilder' ),
					'url'     => $this->get_wp_customize_url('section', 'title_tagline'),
				],
				[
					'id'      => 'siteDetails-2',
					'type'    => 'task',
					'title'   => __( 'Edit Site Icon', 'wme-sitebuilder' ),
					'url'     => $this->get_wp_customize_url('section', 'kadence_customizer_site_identity'),
				],
				[
					'id'      => 'siteDetails-3',
					'type'    => 'task',
					'title'   => __( 'Update Social Links', 'wme-sitebuilder' ),
					'url'     => $this->get_wp_customize_url('section', 'kadence_customizer_general_social'),
				],
			],
		];

		return $props;
	}
}
