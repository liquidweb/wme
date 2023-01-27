<?php

namespace Tribe\WME\Sitebuilder\Admin\User;

use Tribe\WME\Sitebuilder\Contracts\ServiceProvider;
use WP_User;

class UserServiceProvider extends ServiceProvider {

	/**
	 * @inheritDoc
	 */
	public function config() {
		return [
			LoginManager::class => null,
		];
	}

	/**
	 * @inheritDoc
	 */
	public function register() {
		add_action( 'wp_login', function( $user_login, WP_User $user ) {
			$this->container->get( LoginManager::class )->set_first_login( $user->ID );
		}, 999, 2 );
	}

}
