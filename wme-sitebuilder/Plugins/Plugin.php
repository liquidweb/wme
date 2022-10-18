<?php

namespace Tribe\WME\Sitebuilder\Plugins\Plugin;

abstract class Plugin {

	/**
	 * @var string
	 */
	protected $slug = '';

	/**
	 * @var string
	 */
	protected $file = '';

	/**
	 * @var string
	 */
	protected $supported_version = '';

	/**
	 * Get properties for card row.
	 *
	 * @return array
	 */
	abstract public function card_row_props();

	/**
	 * Get properties for card footer.
	 *
	 * @return array
	 */
	abstract public function card_footer_props();

	/**
	 * Get properties for wizard.
	 *
	 * @return array
	 */
	abstract public function wizard_props();

	/**
	 * Getter.
	 *
	 * @param string $property_name
	 *
	 * @return mixed
	 */
	public function __get( $property_name ) {
		return $this->$property_name;
	}
}
