<?php
/**
 * Plugin Name: WME Sitebuilder
 * Plugin URI:  https://stellarwp.com
 * Description: Easily build and configure a site.
 * Version:     0.1.0
 * Author:      Modern Tribe Incubator Team
 * Author URI:  https://tri.be/
 * Text Domain: wme-sitebuilder
 * Domain Path: /languages
 * License:     MIT
 * License URI: https://opensource.org/licenses/MIT
 */

// Call our namepsace.

namespace Tribe\WME\Sitebuilder;

// Exit if accessed directly
if (! defined('ABSPATH')) {
    exit;
}

// At this time, the plugin doesn't need to do anything if WordPress is currently installing.
if (defined('WP_INSTALLING') && WP_INSTALLING) {
    return;
}

// The version of the Nexcess Managed Apps plugin.
define(__NAMESPACE__ . '\PLUGIN_VERSION', '0.1.0');
define(__NAMESPACE__ . '\PLUGIN_URL', plugin_dir_url(__FILE__));
define(__NAMESPACE__ . '\PLUGIN_DIR', __DIR__ . '/wme-sitebuilder/');
define(__NAMESPACE__ . '\VENDOR_DIR', __DIR__ . '/wme-sitebuilder/vendor/');

// Initialize the plugin.
try {
    require_once VENDOR_DIR . 'autoload.php';
} catch (\Exception $e) {
    // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
    trigger_error(esc_html(sprintf(
        'WME Sitebuilder Error: %1$s',
        $e->getMessage()
    )), E_USER_WARNING);
}
