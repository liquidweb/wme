<?php

namespace Tribe\WME\Sitebuilder\Concerns;

trait HasWordPressDependencies {

	/**
	 * Verify that a plugin is installed.
	 *
	 * This is a wrapper around WordPress' get_plugins() function, ensuring the necessary
	 * file is installed before checking.
	 *
	 * @see get_plugins()
	 *
	 * @param string $plugin The directory/file path.
	 *
	 * @return bool
	 */
	public function isPluginInstalled( $plugin ) {
		if ( ! function_exists( 'get_plugins' ) ) {
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$all_plugins = get_plugins();

		return array_key_exists( $plugin, $all_plugins );
	}

	/**
	 * Verify that a plugin is both installed and active.
	 *
	 * This is a wrapper around WordPress' is_plugin_active() function, ensuring the necessary
	 * file is loaded before checking.
	 *
	 * @see is_plugin_active()
	 *
	 * @param string $plugin The directory/file path.
	 *
	 * @return bool
	 */
	public function isPluginActive( $plugin ) {
		if ( ! function_exists( 'is_plugin_active' ) ) {
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		return is_plugin_active( $plugin );
	}

	/**
	 * Get specified plugin's version.
	 *
	 * @see get_plugins()
	 *
	 * @param string $plugin_file "plugin-directory/plugin-file.php".
	 *
	 * @return string
	 */
	public function getPluginVersion( $plugin_file ) {
		if ( ! function_exists( 'get_plugin_data' ) ) {
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$plugins = get_plugins();

		if ( ! array_key_exists( $plugin_file, $plugins ) ) {
			return '';
		}

		$data = $plugins[ $plugin_file ];

		if ( empty( $data['Version'] ) ) {
			return '';
		}

		return $data['Version'];
	}

	/**
	 * Verify that plugin is installed and the version is supported.
	 *
	 * @uses $this->getPluginVersion()
	 *
	 * @param string $plugin           The directory/file path.
	 * @param string $expected_version The version to check against.
	 *
	 * @return bool
	 */
	public function isPluginVersion( $plugin, $expected_version ) {
		$actual_version = $this->getPluginVersion( $plugin );

		if ( empty( $actual_version ) ) {
			return false;
		}

		return $actual_version === $expected_version;
	}
}
