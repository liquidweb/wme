<?php

namespace Tribe\WME\Sitebuilder\Support\Downloader;

use RuntimeException;

/**
 * Downloads, installs and activates WordPress plugins.
 */
class PluginInstaller {

	/**
	 * @var \Tribe\WME\Sitebuilder\Support\Downloader\Plugin
	 */
	protected $plugin;

	/**
	 * @var \Tribe\WME\Sitebuilder\Support\Downloader\Installer
	 */
	protected $installer;

	public function __construct( Plugin $plugin, Installer $installer ) {
		$this->plugin    = $plugin;
		$this->installer = $installer;
	}

	/**
	 * @param  string  $slug
	 * @param  string  $version
	 * @param  bool    $activate
	 *
	 * @throws \PhpZip\Exception\ZipException|\RuntimeException
	 *
	 * @return void
	 */
	public function install( $slug, $version, $activate = true ) {
		$plugin_url = $this->plugin->find( $slug, $version );

		if ( ! $plugin_url ) {
			throw new RuntimeException( sprintf( 'Plugin URL not found for slug: %s', $slug ) );
		}

		if ( ! $this->installer->install( $plugin_url, $slug, WP_PLUGIN_DIR ) ) {
			throw new RuntimeException( sprintf( 'Unable to install plugin with slug: %s', $slug ) );
		}

		if ( $activate ) {
			$activated = activate_plugin( $this->getPluginFile( $slug ) );

			if ( is_wp_error( $activated ) ) {
				throw new RuntimeException( sprintf( 'Unable to activate plugin with slug: %s. Message: %s', $slug, $activated->get_error_message() ) );
			}
		}

	}

	/**
	 * Get the path to the plugin file.
	 *
	 * @param string $slug The plugin slug.
	 *
	 * @return string The directory/file.php relative to the plugins folder.
	 */
	protected function getPluginFile( $slug ) {
		// Make sure our plugin list is not cached.
		wp_cache_delete( 'plugins', 'plugins' );

		$plugins = get_plugins();

		foreach ( $plugins as $file => $data ) {
			if ( ! str_starts_with( $file, $slug ) ) {
				continue;
			}

			return $file;
		}

		return '';
	}

}
