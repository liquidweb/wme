<?php

namespace Tribe\WME\Sitebuilder\Contracts;

/**
 * The Service Provider Interface.
 */
interface Providable {

	/**
	 * Boot the service provider, registering its definitions in the container.
	 *
	 * @return void
	 */
	public function boot();

	/**
	 * Registers action/filter listeners to hook
	 * into WordPress.
	 *
	 * @return void
	 */
	public function register();

}
