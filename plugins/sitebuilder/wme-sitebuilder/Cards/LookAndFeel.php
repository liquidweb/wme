<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Wizards\LookAndFeel as LookAndFeelWizard;

class LookAndFeel extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $card_slug = 'lookandfeel';

	/**
	 * @var LookAndFeelWizard
	 */
	protected $wizard;

	/**
	 * Construct.
	 *
	 * @param LookAndFeelWizard $wizard
	 */
	public function __construct( LookAndFeelWizard $wizard ) {
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
			'id'        => 'look-and-feel',
			'title'     => __( 'Design your site', 'wme-sitebuilder' ),
			'intro'     => __( 'It\'s all about appearances.', 'wme-sitebuilder' ),
			'completed' => $this->wizard->isComplete(),
			'time'      => __( '3 Minutes', 'wme-sitebuilder' ),
			'rows'      => $this->rows(),
			'footers'   => $this->footer(),
		];
	}

	/**
	 * Build the Card rows base in the completed state.
	 *
	 * @return array[] The card rows.
	 */
	protected function rows() {
		if ( $this->wizard->isComplete() ) {
			$return_url     = add_query_arg( 'page', $this->admin_page_slug, admin_url( 'admin.php' ) );
			$customizer_url = add_query_arg( 'return', rawurlencode( $return_url ), admin_url( 'customize.php' ) );

			return [
				[
					'id'      => 'fonts-colors-wizard',
					'type'    => 'task',
					'taskCta' => __( 'Get Started', 'wme-sitebuilder' ),
					'title'   => __( 'Fonts & Colors', 'wme-sitebuilder' ),
					'intro'   => __( 'Further customize the look of your site.', 'wme-sitebuilder' ),
					'icon'    => 'setup-icon-palette.png',
					'url'     => $customizer_url,
				],
			];
		}

		return [
			[
				'id'         => 'look-and-feel-wizard',
				'type'       => 'task',
				'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
				'title'      => __( 'Select A Starter Template', 'wme-sitebuilder' ),
				'intro'      => __( 'Choose a design to start with and customize.', 'wme-sitebuilder' ),
				'icon'       => 'setup-icon-design.png',
				'wizardHash' => '/wizard/look-and-feel',
			],
		];
	}

	/**
	 * If the card is completed then a footer section is added.
	 *
	 * @return array|array[] Array with information. Empty array otherwise.
	 */
	protected function footer() {
		$footer_messages = [
			[
				'title'    => __( 'Edit specific Pages', 'wme-sitebuilder' ),
				'url'      => add_query_arg( 'post_type', 'page', admin_url( 'edit.php' ) ),
				'target'   => '_self',
				'dashicon' => '',
			],
		];

		if ( $this->wizard->isComplete() ) {
			$footer_messages[] = [
				'title'    => __( 'Pick a different template', 'wme-sitebuilder' ),
				'url'      => '',
				'target'   => '',
				'dashicon' => '',
			];
		}

		return [
			[
				'id'       => 'look-and-feel-wizard',
				'type'     => 'look-and-feel-footer',
				'messages' => $footer_messages,
			],
		];
	}
}
