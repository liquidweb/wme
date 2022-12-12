<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Concerns\UsesAjax;

abstract class Card {

	use UsesAjax;

	/**
	 * @var string
	 */
	protected $admin_page_slug;

	/**
	 * @var string $card_slug
	 */
	protected $card_slug;

	/**
	 * Properties for card.
	 *
	 * @return array
	 */
	abstract public function props();

	/**
	 * Construct.
	 */
	public function __construct() {
		$this->register_hooks();
	}

	/**
	 * Register hooks.
	 */
	public function register_hooks() {
		$hook = sprintf( '%s/print_scripts', $this->admin_page_slug );
		add_action( $hook, [ $this, 'action__print_scripts' ] );

		$this->maybe_register_ajax_action();
	}

	/**
	 * Action: {$this->admin_page_slug}/print_scripts.
	 *
	 * Print card properties to admin page.
	 *
	 * @uses $this->props()
	 */
	public function action__print_scripts() {
		$props         = (array) $this->props();
		$default_props = [
			'slug' => $this->card_slug,
		];

		if ( $this->supports_ajax() ) {
			$default_props['ajax'] = $this->ajax_props();
		}

		$admin_slug = wp_json_encode( str_replace( '-', '_', (string) $this->admin_page_slug ) );
		$props      = wp_json_encode( wp_parse_args( $props, $default_props ) );

		// We've already encoded the data for ingestion to JS.
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		printf( '<script>window[%s]["cards"].push( %s )</script>%s', $admin_slug, $props, PHP_EOL );
	}

}
