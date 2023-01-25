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
	 * Configure additional container definitions.
	 *
	 * @return array<string|class-string,callable|class-string|object> A mapping of identifiers to callables.
	 */
	public function config();

	/**
	 * Registers action/filter listeners to hook
	 * into WordPress.
	 *
	 * @return void
	 */
	public function register();

}
