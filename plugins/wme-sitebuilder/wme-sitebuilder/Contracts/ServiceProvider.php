<?php

namespace Tribe\WME\Sitebuilder\Contracts;

use Psr\Container\ContainerInterface;

abstract class ServiceProvider implements Providable {

	/**
	 * @var \Psr\Container\ContainerInterface|\StellarWP\Container\Container
	 */
	protected $container;

	public function __construct( ContainerInterface $container ) {
		$this->container = $container;
	}

	/**
	 * Configure additional container definitions.
	 *
	 * @return array<string|class-string,callable|class-string|object> A mapping of identifiers to callables.
	 */
	abstract protected function config();

	/**
	 * Add all the additional container definitions.
	 *
	 * @return void
	 */
	public function boot() {
		foreach ( $this->config() as $abstract => $definition ) {
			$this->container->extend( $abstract, $definition );
		}
	}

}
