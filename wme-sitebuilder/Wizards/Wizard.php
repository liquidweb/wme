<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\UsesAjax;

abstract class Wizard {

	use UsesAjax;

	/**
	 * @var string
	 */
	protected $admin_page_slug;

	/**
	 * @var string
	 */
	protected $wizard_slug;

	/**
	 * Properties for wizard.
	 *
	 * @return array
	 */
	abstract public function props();

	/**
	 * AJAX action for finishing wizard.
	 */
	abstract public function finish();

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

		if ( ! $this->maybe_register_ajax_action() ) {
			return;
		}

		$this->add_ajax_action( 'finish', [ $this, 'finish' ] );
	}

	/**
	 * Action: {$admin_page_slug}/print_scripts.
	 *
	 * Print wizard properties to admin page.
	 *
	 * @uses $this->props()
	 */
	public function action__print_scripts() {
		$props         = (array) $this->props();
		$default_props = [
			'slug' => $this->wizard_slug,
		];

		if ( $this->supports_ajax() ) {
			$default_props['ajax'] = $this->ajax_props();
		}

		$admin_slug  = wp_json_encode( str_replace( '-', '_', (string) $this->admin_page_slug ) );
		$wizard_slug = wp_json_encode( str_replace( '-', '_', (string) $this->wizard_slug ) );
		$props       = wp_json_encode( wp_parse_args( $props, $default_props ) );

		// We've already encoded the data for ingestion to JS.
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		printf( '<script>window[%s]["wizards"][%s] = %s</script>%s', $admin_slug, $wizard_slug, $props, PHP_EOL );
	}

	/**
	 * Returns whether the wizard is considered completed. Defaults to false so it will always be shown.
	 *
	 * @return bool
	 */
	public function isComplete() {
		return false;
	}
}
