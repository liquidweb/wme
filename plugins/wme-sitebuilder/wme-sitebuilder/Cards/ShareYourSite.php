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
			'intro'     => __( 'Make sure your site can be found.', 'wme-sitebuilder' ),
			'completed' => false,
			'rows'      => [
				[
					'id'    => 'site-domain',
					'type'  => 'task',
					'title' => __( 'Update Your Domain', 'wme-sitebuilder' ),
					'intro' => __( 'Set your domain so your audience can find you.', 'wme-sitebuilder' ),
					'url'   => admin_url( 'admin.php?page=site-settings&card=site-domain' ), // @todo link to open card
				],
				[
					'id'    => 'site-visibility',
					'type'  => 'task',
					'title' => __( 'Set Site Visibility', 'wme-sitebuilder' ),
					'intro' => __( 'You can hide your site while you work or make it public.', 'wme-sitebuilder' ),
					'url'   => admin_url( 'admin.php?page=site-settings&card=site-visibility' ), // @todo link to open card
				]
			]
		];
	}

}
