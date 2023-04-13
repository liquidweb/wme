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
		$props = [
			'id'        => 'siteDetails',
			'navTitle'  => __( 'Site Details', 'wme-sitebuilder' ),
			'title'     => __( 'Site Details', 'wme-sitebuilder' ),
			'intro'     => __( 'Update your logo, company name and tagline.', 'wme-sitebuilder' ),
			'completed' => false,
			'rows'      => [
				[
					'id'      => 'siteDetails-1',
					'type'    => 'task',
					'taskCta' => __( 'Get Started', 'wme-sitebuilder' ),
					'title'   => __( 'Edit Site Name, Logo & Details', 'wme-sitebuilder' ),
					'intro'   => __( 'Tell us a little bit about your site.', 'wme-sitebuilder' ),
					'url'     => $this->get_wp_customize_url(),
				],
			],
		];

		return $props;
	}

	/**
	 * Get the URL for the WP Customizer including the section to focus on.
	 *
	 * @return string
	 */
	protected function get_wp_customize_url() {
		$return_url = add_query_arg( 'page', $this->admin_page_slug, admin_url( 'admin.php' ) );

		return add_query_arg(
			[
				'autofocus[section]' => 'title_tagline',
				'return'             => rawurlencode( $return_url )
			],
			admin_url( 'customize.php' )
		);
	}

}
