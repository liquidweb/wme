<?php

namespace Tribe\WME\Sitebuilder\Modules;

abstract class Module {

	/**
	 * @var string
	 */
	protected $page_title;

	/**
	 * @var string
	 */
	protected $menu_title;

	/**
	 * @var string
	 */
	protected $capability;

	/**
	 * @var string
	 */
	protected $menu_slug;

	/**
	 * @var string
	 */
	protected $icon_url = '';

	/**
	 * @var null|int
	 */
	protected $position;

	/**
	 * @var array<\Tribe\WME\Sitebuilder\Cards\Card>
	 */
	protected $cards = [];

	/**
	 * @var array<object>
	 */
	protected $wizards = [];

	/**
	 * Construct.
	 *
	 * @param array<\Tribe\WME\Sitebuilder\Cards\Card> $cards
	 */
	public function __construct( array $cards ) {
		$this->cards = $cards;
	}

	/**
	 * Setup the Module.
	 */
	public function setup() {
		$this->register_hooks();
	}

	/**
	 * Register hooks.
	 */
	public function register_hooks() {
		add_action( 'admin_menu', [ $this, 'action__admin_menu' ] );
	}

	/**
	 * Action: admin_menu.
	 *
	 * Register menu page.
	 *
	 * @uses $this->register_menu_page()
	 */
	public function action__admin_menu() {
		if ( 'admin_menu' !== current_action() ) {
			return;
		}

		$slug = $this->register_menu_page();

		add_action( 'admin_print_styles-' . $slug, [ $this, 'action__admin_print_styles' ] );
		add_action( 'admin_print_footer_scripts-' . $slug, [ $this, 'action__admin_print_footer_scripts' ] );
	}

	/**
	 * Callback: add_menu_page.
	 *
	 * @see $this->action__admin_init()
	 */
	public function callback__menu_page() {
		printf( '<div id="%1$s-react" data-js="%1$s"></div>', esc_attr( $this->menu_slug ) );
	}

	/**
	 * Action: admin_print_styles_{$page_slug}.
	 *
	 * Print or enqueue styles for the admin page.
	 */
	public function action__admin_print_styles() {
		$hook = sprintf( '%s/print_styles', $this->menu_slug );
		do_action( $hook );
	}

	/**
	 * Action: admin_print_footer_scripts{$page_slug}.
	 *
	 * Print or enqueue scripts for the admin page in the footer.
	 */
	public function action__admin_print_footer_scripts() {
		printf( '<script>window[%1$s] = window[%1$s] || {"cards":[],"wizards":{}}</script>%2$s', wp_json_encode( str_replace( '-', '_', (string) $this->menu_slug ) ), PHP_EOL );
		$hook = sprintf( '%s/print_scripts', $this->menu_slug );
		do_action( $hook );
	}

	/**
	 * Register admin menu page.
	 *
	 * @return false|string
	 */
	protected function register_menu_page() {
		return add_menu_page(
			$this->page_title,
			$this->menu_title,
			$this->capability,
			$this->menu_slug,
			[ $this, 'callback__menu_page' ],
			$this->icon_url,
			$this->position
		);
	}

	/**
	 * Get admin page URL.
	 *
	 * @return string
	 */
	public function getPageUrl() {
		return add_query_arg( 'page', $this->menu_slug, admin_url( 'admin.php' ) );
	}

}
