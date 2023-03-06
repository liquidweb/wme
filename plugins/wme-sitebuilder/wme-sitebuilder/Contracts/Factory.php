<?php

namespace Tribe\WME\Sitebuilder\Contracts;

interface Factory {

	/**
	 * Create an instance using the container.
	 *
	 * @template T of object
	 *
	 * @param  class-string<T>  $class  The container class id.
	 *
	 * @return T
	 */
	public function make( $class );

}
