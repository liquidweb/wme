<?php

/**
 * IMPORTANT: PHP traits can't define constants, but the getData() method assumes that the class
 * has an "DATA_STORE_NAME" constant defined, corresponding to the option name.
 */

namespace Tribe\WME\Sitebuilder\Concerns;

use Tribe\WME\Sitebuilder\Support\GroupedOption;

trait StoresData {

	/**
	 * @var GroupedOption
	 */
	private $dataStore;

	/**
	 * Get the Data via the GroupedOption instance.
	 *
	 * Note that this method assumes the class has an "DATA_STORE_NAME" class constant defined.
	 *
	 * @return GroupedOption
	 */
	protected function getData() {
		if ( null === $this->dataStore ) {
			$this->dataStore = new GroupedOption( self::DATA_STORE_NAME );
		}

		return $this->dataStore;
	}

	/**
	 * Save changes to the Data.
	 *
	 * @return GroupedOption
	 */
	public function saveData() {
		$this->dataStore->save();

		return $this->dataStore;
	}
}
