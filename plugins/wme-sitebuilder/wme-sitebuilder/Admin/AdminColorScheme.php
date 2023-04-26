<?php

namespace Tribe\WME\Sitebuilder\Admin;

use Tribe\WME\Sitebuilder\Concerns\HasAssets;

class AdminColorScheme
{
	use HasAssets;
	/**
	 * Add the new admin color scheme.
	 *
	 * @return void
	 */
	public function add_admin_color_scheme() {
		wp_admin_css_color(
			'sitebuilder',
			'WME Sitebuilder',
			$this->getAssetSource( 'admin/admin-color-scheme.css' ),
			['#000000', '#ffffff', '#5a00cd', '#232a2c']
		);
	}

	/**
	 * Set the new admin color scheme to the current user.
	 *
	 * @return void
	 */
	public function set_admin_color_scheme() {
		$user_id = get_current_user_id();
		$args = [
			'ID' => $user_id,
			'admin_color' => 'sitebuilder',
		];
		wp_update_user( $args );
	}
}
