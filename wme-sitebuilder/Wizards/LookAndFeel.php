<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\HasOptions;
use Tribe\WmeBackendStarter\Wizard;

class LookAndFeel extends Wizard {

	use HasOptions;

	const FIELD_COLOR    = 'color';
	const FIELD_FONT     = 'font';
	const FIELD_TEMPLATE = 'template';
	const OPTION_NAME    = '_sitebuilder_look_and_feel';

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $wizard_slug = 'look-and-feel';

	/**
	 * @var string
	 */
	protected $ajax_action = 'sitebuilder-wizard-lookandfeel';

	/**
	 * @var array
	 */
	protected $fields = [];

	/**
	 * @var array
	 */
	public $errors = [];

	/**
	 * Construct.
	 */
	public function __construct() {
		parent::__construct();

		$this->add_ajax_action( 'wizard_started', [ $this, 'telemetryWizardStarted' ] );
	}

	/**
	 * Properties for Look and Feel wizard.
	 *
	 * @return array
	 */
	public function props() {
		return [
			'canBeClosed' => true,
			'autoLaunch'  => false,
			'theme'       => wp_get_theme()->name,
			'template'    => $this->getTemplate(),
			'font'        => $this->getFont(),
			'color'       => $this->getColor(),
			'completed'   => $this->isComplete(),
			'kadence'     => [
				'ajax' => [
					'nonce' => wp_create_nonce( 'kadence-ajax-verification' ),
				],
			],
		];
	}

	/**
	 * Telemetry: wizard started.
	 */
	public function telemetryWizardStarted() {
		do_action( 'wme_event_wizard_started', 'look_and_feel' );

		return wp_send_json_success();
	}

	/**
	 * Finish the wizard.
	 */
	public function finish() {
		$fields = [
			self::FIELD_COLOR,
			self::FIELD_FONT,
			self::FIELD_TEMPLATE,
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
			if ( ! array_key_exists( $field, $_POST ) ) {
                // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				trigger_error( sprintf( 'Field <code>%s</code> is absent in $_POST global.', esc_html( $field ) ), E_USER_WARNING );

				continue;
			}

            // phpcs:ignore WordPress.Security.NonceVerification.Missing
			call_user_func( $callable, $_POST[ $field ] );
		}

		if ( ! $this->getOption()->isDirty() ) {
			return;
		}

		$this->getOption()->set( 'complete', true );
		$saved = $this->getOption()->save();

		if ( ! $saved ) {
			wp_send_json_error( [ $this->wizard_slug => __( 'Invalid look and feel values.', 'wme-sitebuilder' ) ] );
		}

		do_action( 'wme_event_wizard_completed', 'look_and_feel' );

		wp_send_json_success();
	}

	/**
	 * Returns the Template value.
	 *
	 * @return string
	 */
	public function getTemplate() {
		return ( $this->getOption()->template ) ? $this->getOption()->template : '';
	}

	/**
	 * Returns the Font value.
	 *
	 * @return string
	 */
	public function getFont() {
		return ( $this->getOption()->font ) ? $this->getOption()->font : '';
	}

	/**
	 * Return the Color value.
	 *
	 * @return string
	 */
	public function getColor() {
		return ( $this->getOption()->color ) ? $this->getOption()->color : '';
	}

	/**
	 * Sets the Look and Feel Template value.
	 *
	 * @param array $value
	 */
	public function setTemplate( $value ) {
		$value = filter_var_array( $value, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( empty( $value ) ) {
			return;
		}

		$this->getOption()->template = $value;
	}

	/**
	 * Sets the Look and Feel Font value.
	 *
	 * @param string $value
	 */
	public function setFont( $value ) {
		$value = filter_var( $value, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( empty( $value ) ) {
			return;
		}

		$this->getOption()->font = $value;
	}

	/**
	 * Sets the Look and Feel Color value.
	 *
	 * @param string $value
	 */
	public function setColor( $value ) {
		$value = filter_var( $value, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( empty( $value ) ) {
			return;
		}

		$this->getOption()->color = $value;
	}

	/**
	 * Checks to see if the wizard has been completed.
	 *
	 * @return bool True if the wizard has been completed, false otherwise.
	 */
	public function isComplete() {
		return (bool) $this->getOption()->get( 'complete', false );
	}
}
