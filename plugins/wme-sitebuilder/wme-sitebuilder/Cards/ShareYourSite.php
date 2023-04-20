<?php

namespace Tribe\WME\Sitebuilder\Cards;

class ShareYourSite extends Card {

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	public function props() {
		return [
			'id'        => 'share-your-site',
			'navTitle'  => __( 'Share Your Site', 'wme-sitebuilder' ),
			'title'     => __( 'Share Your Site', 'wme-sitebuilder' ),
			'intro'     => __( 'Get started on your goals by completing a few tasks.', 'wme-sitebuilder' ),
			'completed' => false,
			'rows'      => [
				[
					'id'    => 'site-visibility',
					'type'  => 'task',
					'title' => __( 'Set Site Visibility', 'wme-sitebuilder' ),
					'intro' => __( 'Set your site to public or private.', 'wme-sitebuilder' ),
					'url'   => admin_url( 'admin.php?page=site-settings&card=site-visibility' ), // @todo link to open card
				],
				[
					'id'    => 'site-domain',
					'type'  => 'task',
					'title' => __( 'Update Your Domain', 'wme-sitebuilder' ),
					'intro' => __( 'Update your site URL with a custom domain you own.', 'wme-sitebuilder' ),
					'url'   => admin_url( 'admin.php?page=site-settings&card=site-domain' ), // @todo link to open card
				]
			]
		];
	}

}
