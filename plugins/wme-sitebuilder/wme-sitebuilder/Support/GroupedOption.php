<?php

/**
 * The grouped option class provides a simple API for interacting with WordPress options that are
 * stored as serialized objects.
 */

namespace Tribe\WME\Sitebuilder\Support;

class GroupedOption implements \Countable, \JsonSerializable {

	/**
	 * @var string
	 */
	protected $option;

	/**
	 * @var mixed The original value as it exists in the database.
	 */
	protected $original;

	/**
	 * @var mixed[] A copy of $original, which may be modified.
	 */
	protected $values;

	/**
	 * Create a new GroupedOption instance.
	 *
	 * @param string $option The option key to work on.
	 */
	public function __construct( $option ) {
		$this->option = $option;
	}

	/**
	 * Magic getter for properties.
	 *
	 * @param string $prop The property name.
	 *
	 * @return mixed
	 */
	public function __get( $prop ) {
		return $this->get( $prop );
	}

	/**
	 * Remove properties.
	 *
	 * @param string $prop The property name.
	 */
	public function __unset( $prop ) {
		$this->delete( $prop );
	}

	/**
	 * Magic setter for properties.
	 *
	 * @param string $prop  The property name.
	 * @param mixed  $value The property value.
	 */
	public function __set( $prop, $value ) {
		$this->set( $prop, $value );
	}

	/**
	 * Retrieve the current values of the grouped option.
	 *
	 * @return mixed[]
	 */
	public function all() {
		return $this->load()->getValues();
	}

	/**
	 * Count the number of keys in the grouped option.
	 *
	 * @return int
	 */
	#[\ReturnTypeWillChange]
	public function count() {
		return count( $this->all() );
	}

	/**
	 * Remove a key from the option values array.
	 *
	 * @param string $key The key to remove.
	 *
	 * @return self
	 */
	public function delete( $key ) {
		unset( $this->load()->values[ $key ] );

		return $this;
	}

	/**
	 * Remove the entire option from the database.
	 *
	 * @return bool True if the option was deleted, false otherwise.
	 */
	public function deleteOption() {
		$this->original = [];
		$this->values   = [];

		return delete_option( $this->option );
	}

	/**
	 * Explicitly retrieve a key from the option values array.
	 *
	 * @param string $key     The key to retrieve.
	 * @param mixed  $default Optional. The default to retrieve if $key is not set. Default is null.
	 *
	 * @return mixed
	 */
	public function get( $key, $default = null ) {
		$this->load();

		return isset( $this->values[ $key ] ) ? $this->values[ $key ] : $default;
	}

	/**
	 * Retrieve the original option values array.
	 *
	 * Note that the option will not be loaded automatically.
	 *
	 * @return mixed[]
	 */
	public function getOriginal() {
		return (array) $this->original;
	}

	/**
	 * Retrieve the current option values array.
	 *
	 * Note that the option will not be loaded automatically.
	 *
	 * @return mixed[]
	 */
	public function getValues() {
		return (array) $this->values;
	}

	/**
	 * Determine whether or not the option value has changed.
	 *
	 * @return bool
	 */
	public function isDirty() {
		// phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
		return $this->values != $this->original;
	}

	/**
	 * Define the JSON-serialized form of the grouped option.
	 *
	 * @return mixed[]
	 */
	#[\ReturnTypeWillChange]
	public function jsonSerialize() {
		return $this->all();
	}

	/**
	 * Load the option from the database if we've not yet done so.
	 *
	 * @return self
	 */
	public function load() {
		return ! isset( $this->original ) ? $this->refresh() : $this;
	}

	/**
	 * Refresh the option value from the database.
	 *
	 * @return self
	 */
	public function refresh() {
		$this->original = (array) get_option( $this->option, [] );
		$this->values   = $this->original;

		return $this;
	}

	/**
	 * Save changes to the options table.
	 *
	 * @return bool True if the option was updated, false otherwise.
	 */
	public function save() {
		$success = update_option( $this->option, $this->values, false );

		// If the data is saved, reset the original so it no longer reports as dirty.
		if ( $success ) {
			$this->original = $this->values;
		}

		return $success;
	}

	/**
	 * Explicitly set a key in the option values array.
	 *
	 * @param string $key   The key to retrieve.
	 * @param mixed  $value The value to assign to the key.
	 *
	 * @return mixed
	 */
	public function set( $key, $value ) {
		$this->load()->values[ $key ] = $value;

		return $this;
	}
}
