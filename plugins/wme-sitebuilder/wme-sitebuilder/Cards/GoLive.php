<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Wizards\Wizard;

class GoLive extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $card_slug = 'golive';

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
			'completed' => $this->wizard->isComplete(),
			'time'      => $this->wizard->isComplete() ? __( 'Complete', 'wme-sitebuilder' ) : '',
			'rows'      => [
				[
					'id'   => 'launch-domain-status',
					'type' => 'launch-domain-status',
				],
			],
			'footers'   => $this->footer(),
		];

		if ( ! $this->wizard->isComplete() ) {
			$details['rows'][] = [
				'id'         => 'site-domain-wizard',
				'type'       => 'task',
				'title'      => __( 'Purchase a domain', 'wme-sitebuilder' ),
				'intro'      => __( 'Don\'t own a domain? Purchase a custom domain for your site.', 'wme-sitebuilder' ),
				'icon'       => 'setup-icon-connect.png',
				'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
				'wizardHash' => '/wizard/go-live-purchase',
			];

			$details['rows'][] = [
                'id'         => 'site-domain-wizard',
                'type'       => 'task',
                'title'      => __( 'Connect your domain', 'wme-sitebuilder' ),
                'intro'      => __( 'Already own a domain? Update your store URL with your custom domain.', 'wme-sitebuilder' ),
                'icon'       => 'setup-icon-launch.png',
                'taskCta'    => __( 'Get Started', 'wme-sitebuilder' ),
                'wizardHash' => '/wizard/go-live-connect',
            ];
		}

		return $details;
	}

	protected function footer() {
		$footer_messages = [
			[
				'title'    => __( 'Our Guide To Going Live', 'wme-sitebuilder' ),
				/* TODO: Update link. */
				'url'      => 'https://www.nexcess.net/help/guide-to-going-live-with-storebuilder/',
				'target'   => '_blank',
				'dashicon' => '',
			],
		];

		return [
			[
				'id'       => 'site-domain-wizard',
				'type'     => 'site-domain-footer',
				'title'    => __( 'Need help?', 'wme-sitebuilder' ),
				'message'  => '',
				'messages' => $footer_messages,
			],
		];
	}
}
