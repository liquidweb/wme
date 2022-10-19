<?php

namespace Tribe\WME\Sitebuilder\Contracts;

/**
 * Indicates that the given functionality should only load if a truth test passes.
 */
interface LoadsConditionally {

	/**
	 * Determine whether or not this extension should load.
	 *
	 * @return bool True if the extension should load, false otherwise.
	 */
	public function shouldLoad();
}
