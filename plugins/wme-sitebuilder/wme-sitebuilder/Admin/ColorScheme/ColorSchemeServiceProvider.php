<?php

namespace Tribe\WME\Sitebuilder\Admin\ColorScheme;

use Tribe\WME\Sitebuilder\Admin\User\LoginManager;
use Tribe\WME\Sitebuilder\Contracts\ServiceProvider;
use WP_User;

class ColorSchemeServiceProvider extends ServiceProvider {

	const COLOR_SCHEME_KEY = 'sitebuilder';

	/**
	 * @return array<string|class-string,callable|object>
	 */
	public function config() {
		return [
			ColorSchemeManager::class => function ( $app ) {
				return new ColorSchemeManager(
					self::COLOR_SCHEME_KEY,
					__( 'WME Platform', 'wme-sitebuilder' ),
					$app->make( LoginManager::class )
				);
			}
		];
	}

	/**
	 * @inheritDoc
	 */
	public function register() {
		add_action( 'admin_init', function () {
			$this->container->get( ColorSchemeManager::class )->register_admin_color_scheme();
		} );

		add_action( 'wp_login', function( $user_login, WP_User $user ) {
			$this->container->get( ColorSchemeManager::class )->set_color_scheme( $user->ID );
		}, 10, 2 );
	}

}
