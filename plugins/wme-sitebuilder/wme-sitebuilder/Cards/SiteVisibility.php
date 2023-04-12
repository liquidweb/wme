<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Concerns\StoresData;

class SiteVisibility extends Card {

	use StoresData;

	const DATA_STORE_NAME = 'wme_sitebuilder_site_visibility';

	const FIELD_HIDE_FROM_SEARCH_ENGINES = 'hideFromSearchEngines';
	const FIELD_RESTRICT_ACCESS          = 'restrictAccess';
	const FIELD_PASSWORD                 = 'password';

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'site-settings';

	/**
	 * @var string
	 */
	protected $card_slug = 'site-visibility';

	/**
	 * @var string
	 */
	protected $ajax_action = 'site-visibility';

	/**
	 * @var array
	 */
	protected $errors = [];

	/**
	 * Construct.
	 *
	 */
	public function __construct() {
		parent::__construct();

		$this->add_ajax_action( 'save', [ $this, 'save' ] );
	}

	/**
	 * Get properties.
	 *
	 * @return array
	 */
	public function props() {
		$details = [
			'id'             => 'site-visibility',
			'navTitle'       => __( 'Site Visibility', 'wme-sitebuilder' ),
			'title'          => __( 'Site Visibility', 'wme-sitebuilder' ),
			'intro'          => __( 'Limit who can access your site online.', 'wme-sitebuilder' ),
			'hideFromSearch' => $this->getData()->get( self::FIELD_HIDE_FROM_SEARCH_ENGINES, get_option( 'blog_public' ) == 1 ? 0 : 1 ),
			'restrictAccess' => $this->getData()->get( self::FIELD_RESTRICT_ACCESS, false ),
			'password'       => $this->getData()->get( self::FIELD_PASSWORD, '' ),
		];

		return $details;
	}

	/**
	 * Save data.
	 *
	 * Hide my sites from search engines, and whatever else.
	 * Restrict access to visitors with the password.
	 *  - Password
	 *
	 * @return array
	 */
	public function save() {
		$fields = [
			self::FIELD_HIDE_FROM_SEARCH_ENGINES,
			self::FIELD_RESTRICT_ACCESS,
			self::FIELD_PASSWORD,
		];

		foreach ( $fields as $field ) {
			$method_name = sprintf( 'set%s', ucfirst( $field ) );

			if ( ! method_exists( $this, $method_name ) ) {
				// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				trigger_error( sprintf( 'Method <code>%s</code> to save <code>%s</code> field is not defined.', esc_html( $method_name ), esc_html( $field ) ), E_USER_WARNING );

				continue;
			}

			$callable = [ $this, $method_name ];

			if ( ! is_callable( $callable ) ) {
				// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				trigger_error( sprintf( 'Method <code>%s</code> to save <code>%s</code> field is defined but not callable.', esc_html( $method_name ), esc_html( $field ) ), E_USER_WARNING );

				continue;
			}

			// phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( ! array_key_exists( $field, $_REQUEST ) ) {
				// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				trigger_error( sprintf( 'Field <code>%s</code> is absent in $_REQUEST global.', esc_html( $field ) ), E_USER_WARNING );

				continue;
			}

			// phpcs:ignore WordPress.Security.NonceVerification.Missing
			call_user_func( $callable, $_REQUEST[ $field ] );
		}

		// Save the data.
		$this->getData()->save();

		if ( ! empty( $this->errors ) ) {
			wp_send_json_error( [
				'errors' => $this->errors,
			] );
		}

		wp_send_json_success();
	}

	/**
	 * Set hide from search engines.
	 *
	 * @param string $value
	 */
	public function setHideFromSearchEngines( $value ) {
		$current = $this->getData()->get( 'hideFromSearchEngines' );

		if ( $current === $value ) {
			return;
		}

		$this->getData()->set( 'hideFromSearchEngines', $value );

		// Update the WordPress option.
		update_option( 'blog_public', $value == 1 ? 0 : 1 );

		// Error handling.
		if ( $value != ( get_option( 'blog_public' ) == 1 ? 0 : 1 ) ) {
			$this->errors[] = __( 'Failed to update the WordPress option <code>blog_public</code>.', 'wme-sitebuilder' );
		}
	}

	/**
	 * Set restrict access.
	 *
	 * @param string $value
	 */
	public function setRestrictAccess( $value ) {
		$current = $this->getData()->get( 'restrictAccess' );

		if ( $current === $value ) {
			return;
		}

		$this->getData()->set( 'restrictAccess', $value );
	}

	/**
	 * Set password.
	 *
	 * @param string $value
	 */
	public function setPassword( $value ) {
		$current = $this->getData()->get( 'password' );

		if ( $current === $value ) {
			return;
		}

		$this->getData()->set( 'password', $value );
	}
}
