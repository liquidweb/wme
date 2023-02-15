<?php

namespace Tribe\WME\Sitebuilder\Factories;

use StellarWP\Container\Container;
use Tribe\WME\Sitebuilder\Contracts\Factory as FactoryContract;

class Factory implements FactoryContract {

	/**
	 * @param  \StellarWP\Container\Container  $container
	 */
	protected $container;

	public function __construct( Container $container ) {
		$this->container = $container;
	}

	/**
	 * Create an instance using the container.
	 *
	 * @template T of object
	 *
	 * @param  class-string<T>  $class  The container class id.
	 *
	 * @return T
	 */
	public function make( $class ) {
		return $this->container->make( $class );
	}

}
