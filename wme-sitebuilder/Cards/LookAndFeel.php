<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Concerns\HasOptions;

class LookAndFeel extends Card {

	use HasOptions;

	const OPTION_NAME = '_sitebuilder_look_and_feel';

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $card_slug = 'lookandfeel';

	/**
	 * @var null|bool
	 */
	protected $complete;

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
			'completed' => $this->isComplete(),
			'time'      => __( '3 Minutes', 'wme-sitebuilder' ),
			'rows'      => $this->rows(),
			'footers'   => $this->footer(),
		];
	}

	/**
	 * Checks to see if the Card has been completed.
	 *
	 * @return bool True if the Card has been completed, false otherwise.
	 */
	protected function isComplete() {
		if ( null !== $this->complete ) {
			return $this->complete;
		}

		$this->complete = (bool) $this->getOption()->get( 'complete', false );

		return $this->complete;
	}

	/**
	 * Build the Card rows base in the completed state.
	 *
	 * @return array[] The card rows.
	 */
	protected function rows() {
		if ( $this->isComplete() ) {
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
		if ( ! $this->isComplete() ) {
			return [];
		}

		$message = '';
		$option  = $this->getOption();

		if ( ! empty( $option->template ) ) {
			$message = $option->template;
		}

		return [
			[
				'id'       => 'look-and-feel-wizard',
				'type'     => 'status',
				'title'    => __( 'Selected Template:', 'wme-sitebuilder' ),
				'message'  => $message,
				'messages' => [],
			],
		];
	}
}
