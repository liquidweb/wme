<?php
/**
 * Plugin Name: WME Sitebuilder
 * Plugin URI:  https://stellarwp.com
 * Description: Easily build and configure a site.
 * Version:     0.6.1
 * Author:      Modern Tribe Incubator Team
 * Author URI:  https://tri.be/
 * Text Domain: wme-sitebuilder
 * Domain Path: /languages
 * License:     MIT
 * License URI: https://opensource.org/licenses/MIT.
 */

namespace Tribe\WME\Sitebuilder;

use Tribe\WME\Sitebuilder\Exceptions\SitebuilderException;
use Tribe\WME\Sitebuilder\Services\Logger;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// At this time, the plugin doesn't need to do anything if WordPress is currently installing.
if ( defined( 'WP_INSTALLING' ) && WP_INSTALLING ) {
	return;
}

// The version of the WME Sitebuilder Managed Apps plugin.
define( __NAMESPACE__ . '\PLUGIN_VERSION', '0.6.1' );
define( __NAMESPACE__ . '\PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( __NAMESPACE__ . '\PLUGIN_DIR', __DIR__ . '/wme-sitebuilder/' );
define( __NAMESPACE__ . '\VENDOR_DIR', __DIR__ . '/wme-sitebuilder/vendor/' );

// Initialize the plugin.
try {
	// If the Container already exists, another package is including this
	// as a composer dependency, and we don't need to require the autoload file.
	if ( ! class_exists( Container::class ) ) {
		require_once VENDOR_DIR . 'autoload.php';
	}

	/** @var Plugin $wme_sitebuilder */
	$wme_sitebuilder = Container::getInstance()->get( Plugin::class );

	$wme_sitebuilder->registerModules([
		Modules\SiteBuilder::class,
		Modules\StoreDetails::class,
	]);

	$wme_sitebuilder->init();
} catch ( \Exception $e ) {
	$message = $e instanceof SitebuilderException
		? 'WME Sitebuilder generated an error: %s'
		: 'WME Sitebuilder caught the following error: %s';

	/** @var Logger $logger */
	$logger = Container::getInstance()
		->get( Logger::class );

	$logger->error(sprintf( $message, $e->getMessage() ), [
		'exception' => $e,
	]);
}
