<?php

namespace Tribe\WME\Sitebuilder\Concerns;

use const Tribe\WME\Sitebuilder\PLUGIN_URL;
use const Tribe\WME\Sitebuilder\PLUGIN_VERSION;

trait HasAssets {

	/**
	 * Get the full URL to a plugin asset.
	 *
	 * @param string $src File name of the asset.
	 *
	 * @return string The full URL to the asset.
	 */
	public function getAssetSource( $src ) {
		return apply_filters( 'wme_sitebuilder_image_asset_path', PLUGIN_URL . '/wme-sitebuilder/assets/' ) . $src;
	}

	/**
	 * Get the asset version.
	 * Plugin version by default, appended by time() if SCRIPT_DEBUG is enabled.
	 *
	 * @return string The asset version.
	 */
	public function getAssetVersion() {
		$version = PLUGIN_VERSION;

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$version .= '.' . time();
		}

		return $version;
	}

	/**
	 * Enqueue a script. Wrapper around wp_enqueue_script() with shortcuts.
	 *
	 * @param string $handle    The script handle.
	 * @param string $src       The script filename, relative to the assets folder: 'wme-sitebuilder/assets'.
	 * @param array  $deps      Dependencies.
	 * @param mixed  $version   The script version, will use the plugin version by default.
	 * @param bool   $in_footer Whether to enqueue the script in the footer.
	 */
	public function enqueueScript( $handle, $src = '', $deps = [], $version = null, $in_footer = true ) {
		if ( ! $version ) {
			$version = $this->getAssetVersion();
		}

		wp_enqueue_script( $handle, $this->getAssetSource( $src ), $deps, $version, $in_footer );
	}

	/**
	 * Enqueue a style. Wrapper around wp_enqueue_style() with shortcuts.
	 *
	 * @param string $handle  The style handle.
	 * @param string $src     The style filename, relative to the assets folder: 'wme-sitebuilder/assets'.
	 * @param array  $deps    Dependencies.
	 * @param mixed  $version The style version, will use the plugin version by default.
	 * @param string $media   The media type.
	 */
	public function enqueueStyle( $handle, $src, $deps = [], $version = null, $media = 'all' ) {
		if ( ! $version ) {
			$version = $this->getAssetVersion();
		}

		wp_enqueue_style( $handle, $this->getAssetSource( $src ), $deps, $version, $media );
	}
}
