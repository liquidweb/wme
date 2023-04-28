<?php

namespace Tribe\WME\Sitebuilder\Admin\User;

class LoginManager {

	const META_KEY = '_has_logged_in';

	/**
	 * Track the first time a user logs in.
	 *
	 * @action wp_login 999
	 *
	 * @param int $user_id
	 *
	 * @return void
	 */
	public function set_first_login( $user_id ) {
		if ( $this->has_logged_in( $user_id ) ) {
			return;
		}

		update_user_meta( $user_id, self::META_KEY, 1 );
	}

	/**
	 * Check if this user has ever logged in.
	 *
	 * @param int $user_id
	 *
	 * @return bool
	 */
	public function has_logged_in( $user_id ) {
		return (bool) get_user_meta( $user_id, self::META_KEY, true );
	}

}
