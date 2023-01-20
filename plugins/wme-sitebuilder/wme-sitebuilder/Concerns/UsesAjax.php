<?php

namespace Tribe\WME\Sitebuilder\Concerns;

trait UsesAjax {

	/**
	 * @var string
	 */
	protected $ajax_action;

	/**
	 * Register callback for AJAX sub-action.
	 *
	 * @param string   $registered_sub_action Slug of sub-action.
	 * @param callable $callback              Callback for the sub-action.
	 */
	public function add_ajax_action( $registered_sub_action, callable $callback ) {
		if ( ! $this->supports_ajax() ) {
			// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
			trigger_error( 'AJAX action cannot be added: <code>ajax_action</code> property is undefined.', E_USER_WARNING );

			return;
		}

		$hook = $this->admin_page_slug . '/' . $this->ajax_action;

		add_action( $hook, static function ( $requested_sub_action ) use ( $registered_sub_action, $callback ) {
			if ( $registered_sub_action !== $requested_sub_action ) {
				return;
			}

			call_user_func( $callback );
		} );
	}

	/**
	 * Action: wp_ajax_{$this->ajax_action}.
	 *
	 * Handle AJAX requests.
	 */
	public function action__wp_ajax() {
		$sub_action = '';

		if ( ! empty( $_REQUEST['sub_action'] ) ) {
			// We're processing the nonce after checking if other params exist.
			// phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$sub_action = $_REQUEST['sub_action'];
		}

		if ( empty( $sub_action ) || empty( $_REQUEST['_wpnonce'] ) ) {
			wp_send_json_error( 'Missing required parameters.', 400 );
		}

		if ( ! wp_verify_nonce( $_REQUEST['_wpnonce'], $this->ajax_action ) ) {
			wp_send_json_error( 'Nonce is invalid.', 403 );
		}

		do_action( $this->admin_page_slug . '/' . $this->ajax_action, $sub_action );
	}

	/**
	 * Check if class supports AJAX.
	 *
	 * @return bool
	 */
	protected function supports_ajax() {
		return ! empty( $this->admin_page_slug ) && ! empty( $this->ajax_action );
	}

	/**
	 * Maybe register AJAX action.
	 *
	 * @uses $this->supports_ajax()
	 *
	 * @return bool
	 */
	protected function maybe_register_ajax_action() {
		if ( ! $this->supports_ajax() ) {
			return false;
		}

		$hook = sprintf( 'wp_ajax_%s', $this->ajax_action );
		add_action( $hook, [ $this, 'action__wp_ajax' ] );

		return true;
	}

	/**
	 * Return properties for AJAX access.
	 *
	 * @return array
	 */
	protected function ajax_props() {
		return [
			'url'    => add_query_arg( 'action', $this->ajax_action, admin_url( 'admin-ajax.php' ) ),
			'nonce'  => wp_create_nonce( $this->ajax_action ),
			'action' => $this->ajax_action,
		];
	}

}
