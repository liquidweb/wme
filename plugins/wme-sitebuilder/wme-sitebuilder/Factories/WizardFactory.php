<?php

namespace Tribe\WME\Sitebuilder\Factories;

use StellarWP\Container\Container;

class WizardFactory {

	/**
	 * @param  \StellarWP\Container\Container  $container
	 */
	protected $container;

	public function __construct( Container $container ) {
		$this->container = $container;
	}

	/**
	 * Create a Wizard Instance.
	 *
	 * @param  class-string  $class  The container class definition.
	 *
	 * @return \Tribe\WME\Sitebuilder\Wizards\Wizard
	 */
	public function make( $class ) {
		return $this->container->make( $class );
	}

}
