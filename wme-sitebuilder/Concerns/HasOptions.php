<?php

/**
 * IMPORTANT: PHP traits can't define constants, but the getOption() method assumes that the class
 * has an "OPTION_NAME" constant defined, corresponding to the option name.
 */

namespace Tribe\WME\Sitebuilder\Concerns;

trait HasOptions {

	/**
	 * @var null|object
	 */
	private $option;

	/**
	 * Get option.
	 *
	 * @return object
	 */
	protected function getOption() {
		$classname = apply_filters( 'sitebuilder_classname_option', null );

		if ( null === $classname ) {
			return new \stdClass();
		}

		if ( null === $this->option ) {
			$this->option = new $classname( self::OPTION_NAME );
		}

		return $this->option;
	}
}
