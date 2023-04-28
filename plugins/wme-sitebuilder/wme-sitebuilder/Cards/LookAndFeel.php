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
			'navTitle'  => __( 'Styles', 'wme-sitebuilder' ),
			'title'     => __( 'Update Site Style', 'wme-sitebuilder' ),
			'intro'     => __( 'Fine tune your selected style choices.', 'wme-sitebuilder' ),
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
		return [
			[
				'id'      => 'colors',
				'type'    => 'task',
				'title'   => __( 'Update your colors', 'wme-sitebuilder' ),
				'url'     => $this->get_wp_customize_url('section', 'kadence_customizer_general_colors'),
			],
			[
				'id'      => 'buttons',
				'type'    => 'task',
				'title'   => __( 'Update your button styles', 'wme-sitebuilder' ),
				'url'     => $this->get_wp_customize_url('section', 'kadence_customizer_general_buttons'),
			],
			[
				'id'      => 'typography',
				'type'    => 'task',
				'title'   => __( 'Update your typography', 'wme-sitebuilder' ),
				'url'     => $this->get_wp_customize_url('section', 'kadence_customizer_general_typography'),
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
