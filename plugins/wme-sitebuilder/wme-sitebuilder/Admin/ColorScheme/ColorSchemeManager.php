<?php

namespace Tribe\WME\Sitebuilder\Admin\ColorScheme;

use Tribe\WME\Sitebuilder\Admin\User\LoginManager;
use Tribe\WME\Sitebuilder\Concerns\HasAssets;

class ColorSchemeManager {

	use HasAssets;

	/**
	 * The unique name of the color scheme.
	 *
	 * @var string
	 */
	protected $key;

	/**
	 * The name of the color scheme, should be
	 * translatable.
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * @var \Tribe\WME\Sitebuilder\Admin\User\LoginManager
	 */
	protected $login_manager;

	/**
	 * @param  string                                          $key
	 * @param  string                                          $name
	 * @param  \Tribe\WME\Sitebuilder\Admin\User\LoginManager  $login_manager
	 */
	public function __construct( $key, $name, LoginManager $login_manager ) {
		$this->key           = $key;
		$this->name          = $name;
		$this->login_manager = $login_manager;
	}

	/**
	 * Register the Sitebuilder color scheme.
	 *
	 * @action admin_init
	 *
	 * @return void
	 */
	public function register_admin_color_scheme() {
		wp_admin_css_color(
			$this->key,
			$this->name,
			$this->getAssetSource( 'admin/admin-color-scheme.css' ),
			[ '#000000', '#ffffff', '#5a00cd', '#232a2c' ]
		);
	}

	/**
	 * Set the user's color scheme, if this is the first time
	 * they are logging in.
	 *
	 * @action wp_login
	 *
	 * @param  int  $user_id
	 *
	 * @return void
	 */
	public function set_color_scheme( $user_id ) {
		if ( $this->login_manager->has_logged_in( $user_id ) ) {
			return;
		}

		update_user_meta( $user_id, 'admin_color', $this->key );
	}

}
