<?php

namespace Tribe\WME\Sitebuilder\Plugins\PaymentGateways;

abstract class PaymentGatewayAbstract {

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

	/**
	 * Verify that a plugin is installed.
	 *
	 * This is a wrapper around WordPress' get_plugins() function, ensuring the necessary
	 * file is installed before checking.
	 *
	 * @see get_plugins()
	 *
	 * @return bool
	 */
	public function isPluginInstalled() {
		if ( ! function_exists( 'get_plugins' ) ) {
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$all_plugins = get_plugins();
		$plugin_file = $this->slug . '/' . $this->file;

		return array_key_exists( $plugin_file, $all_plugins );
	}

	/**
	 * Verify that a plugin is both installed and active.
	 *
	 * This is a wrapper around WordPress' is_plugin_active() function, ensuring the necessary
	 * file is loaded before checking.
	 *
	 * @see is_plugin_active()
	 *
	 * @return bool
	 */
	public function isPluginActive() {
		if ( ! function_exists( 'is_plugin_active' ) ) {
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$plugin_file = $this->slug . '/' . $this->file;

		return is_plugin_active( $plugin_file );
	}

	/**
	 * Verify that plugin version is supported.
	 *
	 * @uses $this->isPluginInstalled()
	 *
	 * @see get_plugin_data()
	 *
	 * @return bool
	 */
	public function isVersionSupported() {
		if ( ! $this->isPluginInstalled() ) {
			return false;
		}

		if ( ! function_exists( 'get_plugins' ) ) {
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$plugin_file = $this->slug . '/' . $this->file;
		$all_plugins = get_plugins();
		$data        = $all_plugins[ $plugin_file ];

		if ( empty( $data['Version'] ) ) {
			return false;
		}

		return $this->supported_version === $data['Version'];
	}
}
