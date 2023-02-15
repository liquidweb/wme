<?php

namespace Tribe\WME\Sitebuilder\Support\Downloader;

use stdClass;

class Plugin {

	/**
	 * Find a WordPress plugin ZIP download URL.
	 *
	 * @param  string  $slug     The plugin slug to find.
	 * @param  string  $version  The plugin version to find.
	 *
	 * @return string
	 */
	public function find( $slug, $version ) {
		$plugin = $this->get_plugin( $slug );

		if ( ! isset( $plugin->version ) || ! isset( $plugin->versions ) ) {
			return '';
		}

		if ( $version === 'latest' ) {
			$version = $plugin->version;
		}

		return isset( $plugin->versions->{$version} ) ? $plugin->versions->{$version} : '';
	}


	/**
	 * Retrieve plugin definitions from the WordPress API.
	 *
	 * @param  string  $slug  The plugin slug.
	 *
	 * @return object
	 */
	protected function get_plugin( $slug ) {
		$data = file_get_contents( sprintf( 'https://api.wordpress.org/plugins/info/1.0/%s.json', $slug ) );

		if ( false === $data ) {
			return new stdClass();
		}

		return json_decode(
			$data,
			false
		);
	}

}
