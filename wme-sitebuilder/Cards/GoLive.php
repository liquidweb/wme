<?php

namespace Tribe\WME\Sitebuilder\Cards;

class GoLive extends Card {

	/**
	 * Option to indicate completion.
	 */
	const COMPLETED_OPTION_NAME = '_sitebuilder_go_live';

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $card_slug = 'golive';

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
		$details = [
			'id'        => 'launch-domain',
			'title'     => __( 'Go Live with a domain', 'wme-sitebuilder' ),
			// phpcs:ignore Generic.Files.LineLength.TooLong
			'intro'     => __( 'Go live with a custom domain, whether you purchased with Nexcess or elsewhere.', 'wme-sitebuilder' ),
			'completed' => $this->isComplete(),
			'time'      => $this->isComplete() ? __( 'Complete', 'wme-sitebuilder' ) : '',
			'rows'      => [
				[
					'id'   => 'launch-domain-status',
					'type' => 'launch-domain-status',
				],
			],
		];

		if ( ! $this->isComplete() ) {
			$details['rows'][] = [
				'id'         => 'site-domain-wizard',
				'type'       => 'task',
				'title'      => __( 'Publish your site with a custom domain', 'wme-sitebuilder' ),
				'intro'      => __( 'Update your store URL with a custom domain you own', 'wme-sitebuilder' ),
				'icon'       => 'setup-icon-launch.png',
				'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
				'wizardHash' => '/wizard/go-live',
			];
		}

		return $details;
	}

	/**
	 * Check if card is marked as completed.
	 *
	 * @return bool
	 */
	public function isComplete() {
		if ( null !== $this->complete ) {
			return $this->complete;
		}

		$this->complete = (bool) get_option( self::COMPLETED_OPTION_NAME, false );

		return $this->complete;
	}
}
