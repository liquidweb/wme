<?php

namespace Tribe\WME\Sitebuilder\Cards;

class ShareYourSite extends Card {

	public function props() {
		$details = [
			'id'       => 'share-your-site',
			'navTitle' => __( 'Share Your Site', 'wme-sitebuilder' ),
			'title'    => __( 'Share Your Site', 'wme-sitebuilder' ),
			'intro'    => __( 'Get started on your goals by completing a few tasks.', 'wme-sitebuilder' ),
		];

		return $details;
	}

}
