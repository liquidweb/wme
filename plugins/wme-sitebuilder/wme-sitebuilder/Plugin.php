<?php

namespace Tribe\WME\Sitebuilder;

use Psr\Log\LoggerInterface;
use Tribe\WME\Sitebuilder\Concerns\HasAssets;
use Tribe\WME\Sitebuilder\Contracts\LoadsConditionally;
use Tribe\WME\Sitebuilder\Modules\Module;

/**
 * The base plugin class.
 */
class Plugin {
	use HasAssets;
	/**
	 * The plugin's DI container instance.
	 *
	 * @var Container
	 */
	protected $container;

	/**
	 * The plugin's logger instance.
	 *
	 * @var LoggerInterface
	 */
	protected $logger;

	/**
	 * An array containing all registered modules.
	 *
	 * @var Array<int,class-string<\Tribe\WME\Sitebuilder\Modules\Module>>
	 */
	protected $modules = [];

	/**
	 * Construct a new instance of the plugin.
	 *
	 * @param Container       $container The DI container instance.
	 * @param LoggerInterface $logger    The PSR-3 logger for the plugin.
	 */
	public function __construct( Container $container, LoggerInterface $logger ) {
		$this->container = $container;
		$this->logger    = $logger;
	}

	/**
	 * Bootstrap the plugin.
	 *
	 * @return self
	 */
	public function init() {
		// Load all registered modules.
		$this->loadModules();

		$this->add_admin_color_scheme();

		return $this;
	}

	/**
	 * Load all registered modules.
	 */
	protected function loadModules() {
		foreach ( $this->getModules() as $module ) {
			$this->loadModule( $module );
		}
	}

	/**
	 * Load an individual module.
	 *
	 * @param string $module The module to load.
	 *
	 * @return bool True if the module was loaded, false otherwise.
	 */
	protected function loadModule( $module ) {
		try {
			/** @var Module&callable $instance */
			$instance = $this->container->get( $module );

			// Modules may implement the LoadsConditionally interface.
			if ( $instance instanceof LoadsConditionally ) {
				if ( ! $instance->shouldLoad() ) {
					$this->container->forget( $module );
					unset( $instance );
					return false;
				}
			}

			$instance->setup();
		} catch ( \Exception $e ) {
			$this->logger->warning( $e->getMessage() );
			$this->container->forget( $module );
			return false;
		}

		return true;
	}

	/**
	 * Retrieve all registered modules.
	 *
	 * @return Array<int,class-string<Module>>
	 */
	public function getModules() {
		return $this->modules;
	}

	/**
	 * Register an array of new modules.
	 *
	 * @param Array<int,class-string<\Tribe\WME\Sitebuilder\Modules\Module>> $modules An array of fully-qualified module class names.
	 *
	 * @return self
	 */
	public function registerModules( $modules ) {
		foreach ( $modules as $module ) {
			$this->registerModule( $module );
		}

		return $this;
	}

	/**
	 * Register a new module.
	 *
	 * @param class-string<Module> $module The fully-qualified module class name.
	 *
	 * @return self
	 */
	public function registerModule( $module ) {
		if ( ! in_array( $module, $this->modules, true ) ) {
			$this->modules[] = $module;
		}

		return $this;
	}

	/**
	 * Add the new admin color scheme.
	 */
	public function add_admin_color_scheme() {
		return wp_admin_css_color(
			'sitebuilder',
			'WME Sitebuilder',
			$this->getAssetSource( 'admin/admin-color-scheme.css' ),
			['#000000', '#ffffff', '#5a00cd' , '#232a2c']
		);
	}

	/**
	 * Set the new admin color scheme to the current user
	 */
	public function set_admin_color_scheme() {
		$user_id = get_current_user_id();
		$args = [
			'ID' => $user_id,
			'admin_color' => 'sitebuilder'
		];
		wp_update_user( $args );
	}
}
