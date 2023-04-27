<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Concerns\HasWordPressDependencies;

class SiteContent extends Card {

	use HasWordPressDependencies;

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $card_slug = 'site-content';

	/**
	 * Get properties.
	 *
	 * @return array
	 */
	public function props() {
		return [
			'id'        => 'site-content',
			'navTitle'  => __( 'Build Your Site', 'wme-sitebuilder' ),
			'title'     => __( 'Build Your Site', 'wme-sitebuilder' ),
			'intro'     => __( 'Get ready to launch with this content checklist.', 'wme-sitebuilder' ),
			'rows'      => [
				[
					'id'      => 'about',
					'type'    => 'task',
					'title'   => __( 'About Page', 'wme-sitebuilder' ),
					'url'     => get_edit_post_link( get_page_by_path('about')->ID, '' ),
				],
				[
					'id'	  => 'services',
					'type'	  => 'task',
					'title'	  => __( 'Your Services Page', 'wme-sitebuilder' ),
					'url'	  => get_edit_post_link( get_page_by_path('services')->ID, '' ),
				],
				[
					'id'	  => 'contact',
					'type'	  => 'task',
					'title'	  => __( 'Contact Page', 'wme-sitebuilder' ),
					'url'	  => get_edit_post_link( get_page_by_path('contacts')->ID, '' ),
				],
				// First Post
				[
					'id'      => 'first-post',
					'type'    => 'task',
					'title'   => __( 'First Post', 'wme-sitebuilder' ),
					'url'     => get_edit_post_link( 1, '' ),
				],
			]
		];
	}
}
