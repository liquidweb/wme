<?php

namespace Tribe\WME\Sitebuilder\Plugins;

use Tribe\WME\Sitebuilder\Concerns\HasWordPressDependencies;

abstract class Plugin {

	use HasWordPressDependencies;

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
	protected $plugin_path = '';

	/**
	 * @var string
	 */
	protected $supported_version = '';

	/**
	 * Construct.
	 */
	public function __construct() {
		$this->plugin_path = $this->slug . '/' . $this->file;
	}

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

	/**
	 * Check if the plugin is installed.
	 *
	 * @return bool
	 */
	public function isInstalled() {
		return $this->isPluginInstalled( $this->plugin_path );
	}

	/**
	 * Determine if the site has a supported version of this plugin installed.
	 *
	 * @uses $this->isPluginVersion()
	 *
	 * @return bool
	 */
	public function isVersionSupported() {
		return $this->isPluginVersion( $this->plugin_path, $this->supported_version );
	}
}
