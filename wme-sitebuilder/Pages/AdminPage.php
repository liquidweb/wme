<?php

namespace Tribe\WME\Sitebuilder\Pages;

abstract class AdminPage {

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
	 * @var null|int|float
	 */
	protected $position = null;

	/**
	 * Construct.
	 */
	public function __construct() {
		$this->register_hooks();
	}

	/**
	 * Register hooks.
	 *
	 * @return void
	 */
	public function register_hooks() {
		add_action( 'admin_menu', [ $this, 'action__admin_menu' ] );
	}

	/**
	 * Action: admin_menu
	 *
	 * Register menu page.
	 *
	 * @uses $this->register_menu_page()
	 *
	 * @return void
	 */
	public function action__admin_menu() {
		if ( 'admin_menu' !== current_action() ) {
			return;
		}

		$slug = $this->register_menu_page();

		add_action( 'admin_print_styles-'         . $slug, [ $this, 'action__admin_print_styles' ] );
		add_action( 'admin_print_footer_scripts-' . $slug, [ $this, 'action__admin_print_footer_scripts' ] );
	}

	/**
	 * Callback: add_menu_page
	 *
	 * @see $this->action__admin_init()
	 *
	 * @return void
	 */
	public function callback__menu_page() {
		printf( '<div id="%1$s-react" data-js="%1$s"></div>', esc_attr( $this->menu_slug ) );
	}

	/**
	 * Action: admin_print_styles_{$page_slug}
	 *
	 * Print or enqueue styles for the admin page.
	 *
	 * @return void
	 */
	public function action__admin_print_styles() {
		do_action( sprintf( '%s/print_styles', $this->menu_slug ) );
	}

	/**
	 * Action: admin_print_footer_scripts{$page_slug}
	 *
	 * Print or enqueue scripts for the admin page in the footer.
	 *
	 * @return void
	 */
	public function action__admin_print_footer_scripts() {
		printf( '<script>window[%1$s] = window[%1$s] || {"cards":[],"wizards":{}}</script>%2$s', json_encode( str_replace( '-', '_', ( string ) $this->menu_slug ) ), PHP_EOL );
		do_action( sprintf( '%s/print_scripts', $this->menu_slug ) );
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

}
