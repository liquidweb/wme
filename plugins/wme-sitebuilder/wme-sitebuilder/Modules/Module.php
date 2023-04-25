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

	/**
	 * Get the main logo that is being consumed by sub applications
	 *
	 * @return array
	 */
	protected function get_logo() {
		return [
			'src' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCA1MiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCQk8cGF0aCBkPSJNMC4xMjEwOTQgMTdIMTAuNjY4VjE0LjczODNIMi43NDYwOVYwLjA4OTg0MzhIMC4xMjEwOTRWMTdaTTE3Ljc4NzggMTcuMjQ2MUMyMS41MTQ0IDE3LjI0NjEgMjMuNzk5NSAxNC43NSAyMy43OTk1IDEwLjY0ODRWMTAuNjI1QzIzLjc5OTUgNi41MjM0NCAyMS41MDI3IDQuMDI3MzQgMTcuNzg3OCA0LjAyNzM0QzE0LjA2MTIgNC4wMjczNCAxMS43NjQ0IDYuNTM1MTYgMTEuNzY0NCAxMC42MjVWMTAuNjQ4NEMxMS43NjQ0IDE0Ljc1IDE0LjA0OTUgMTcuMjQ2MSAxNy43ODc4IDE3LjI0NjFaTTE3Ljc4NzggMTUuMTI1QzE1LjU5NjQgMTUuMTI1IDE0LjM2NTkgMTMuNDcyNyAxNC4zNjU5IDEwLjY0ODRWMTAuNjI1QzE0LjM2NTkgNy44MDA3OCAxNS41OTY0IDYuMTQ4NDQgMTcuNzg3OCA2LjE0ODQ0QzE5Ljk2NzUgNi4xNDg0NCAyMS4yMDk3IDcuODAwNzggMjEuMjA5NyAxMC42MjVWMTAuNjQ4NEMyMS4yMDk3IDEzLjQ2MDkgMTkuOTY3NSAxNS4xMjUgMTcuNzg3OCAxNS4xMjVaTTMxLjQ5MzYgMjEuNDg4M0MzNS4xMDMgMjEuNDg4MyAzNy4zODgxIDE5LjYzNjcgMzcuMzg4MSAxNi43NDIyVjQuMjczNDRIMzQuODU2OVY2LjM1OTM4SDM0LjcwNDVDMzMuOTY2MiA0LjkyOTY5IDMyLjU4MzQgNC4wNTA3OCAzMC44MDIyIDQuMDUwNzhDMjcuNDk3NSA0LjA1MDc4IDI1LjQ3MDIgNi42MTcxOSAyNS40NzAyIDEwLjI1VjEwLjI3MzRDMjUuNDcwMiAxMy44NTk0IDI3LjQ4NTggMTYuMzc4OSAzMC43NTUzIDE2LjM3ODlDMzIuNTAxNCAxNi4zNzg5IDMzLjkwNzcgMTUuNjA1NSAzNC42ODExIDE0LjIyMjdIMzQuODY4NlYxNi43MzA1QzM0Ljg2ODYgMTguNDY0OCAzMy42MjY0IDE5LjQ0OTIgMzEuNTI4NyAxOS40NDkyQzI5LjgwNjEgMTkuNDQ5MiAyOC43NzQ4IDE4LjgyODEgMjguNTYzOSAxNy45NDkyTDI4LjU1MjIgMTcuOTI1OEgyNS45ODU4TDI1Ljk2MjMgMTcuOTQ5MkMyNi4yNjcgMjAuMDcwMyAyOC4yNTkyIDIxLjQ4ODMgMzEuNDkzNiAyMS40ODgzWk0zMS40NTg0IDE0LjI4MTJDMjkuMjkwNSAxNC4yODEyIDI4LjA3MTcgMTIuNjI4OSAyOC4wNzE3IDEwLjI2MTdWMTAuMjM4M0MyOC4wNzE3IDcuODcxMDkgMjkuMjkwNSA2LjIwNzAzIDMxLjQ1ODQgNi4yMDcwM0MzMy42MDMgNi4yMDcwMyAzNC45MTU1IDcuODcxMDkgMzQuOTE1NSAxMC4yMzgzVjEwLjI2MTdDMzQuOTE1NSAxMi42NDA2IDMzLjYxNDcgMTQuMjgxMiAzMS40NTg0IDE0LjI4MTJaTTQ1LjcxNSAxNy4yNDYxQzQ5LjQ0MTYgMTcuMjQ2MSA1MS43MjY3IDE0Ljc1IDUxLjcyNjcgMTAuNjQ4NFYxMC42MjVDNTEuNzI2NyA2LjUyMzQ0IDQ5LjQyOTggNC4wMjczNCA0NS43MTUgNC4wMjczNEM0MS45ODg0IDQuMDI3MzQgMzkuNjkxNiA2LjUzNTE2IDM5LjY5MTYgMTAuNjI1VjEwLjY0ODRDMzkuNjkxNiAxNC43NSA0MS45NzY3IDE3LjI0NjEgNDUuNzE1IDE3LjI0NjFaTTQ1LjcxNSAxNS4xMjVDNDMuNTIzNiAxNS4xMjUgNDIuMjkzMSAxMy40NzI3IDQyLjI5MzEgMTAuNjQ4NFYxMC42MjVDNDIuMjkzMSA3LjgwMDc4IDQzLjUyMzYgNi4xNDg0NCA0NS43MTUgNi4xNDg0NEM0Ny44OTQ3IDYuMTQ4NDQgNDkuMTM2OSA3LjgwMDc4IDQ5LjEzNjkgMTAuNjI1VjEwLjY0ODRDNDkuMTM2OSAxMy40NjA5IDQ3Ljg5NDcgMTUuMTI1IDQ1LjcxNSAxNS4xMjVaIiBmaWxsPSJ3aGl0ZSIgLz4KCTwvc3ZnPg==',
			'width' => 70,
		];
	}

}
