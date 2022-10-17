<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\StoresData;

class LookAndFeel extends Wizard {

	use StoresData;

	const FIELD_COLOR     = 'color';
	const FIELD_FONT      = 'font';
	const FIELD_TEMPLATE  = 'template';
	const DATA_STORE_NAME = '_sitebuilder_look_and_feel';

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
			'template'    => $this->getData()->get( self::FIELD_TEMPLATE, '' ),
			'font'        => $this->getData()->get( self::FIELD_FONT, '' ),
			'color'       => $this->getData()->get( self::FIELD_COLOR, '' ),
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
            // phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( ! array_key_exists( $field, $_POST ) ) {
                // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				trigger_error( sprintf( 'Field <code>%s</code> is absent in $_POST global.', esc_html( $field ) ), E_USER_WARNING );

				continue;
			}

			// phpcs:ignore WordPress.Security.NonceVerification.Missing
			$value = filter_var_array( $_POST[ $field ], FILTER_SANITIZE_FULL_SPECIAL_CHARS );
			$this->getData()->set( $field, $value );
		}

		if ( ! $this->getData()->isDirty() ) {
			return;
		}

		// This handles saving all of the incoming values.
		$saved = $this->getData()->set( 'complete', true )->save();

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
		return $this->getData()->get( self::FIELD_TEMPLATE, '' );
	}

	/**
	 * Returns the Font value.
	 *
	 * @return string
	 */
	public function getFont() {
		return $this->getData()->get( self::FIELD_FONT, '' );
	}

	/**
	 * Return the Color value.
	 *
	 * @return string
	 */
	public function getColor() {
		return $this->getData()->get( self::FIELD_COLOR, '' );
	}

	/**
	 * Check if Wizard has been completed.
	 *
	 * @return bool
	 */
	public function isComplete() {
		return (bool) $this->getData()->get( 'complete', false );
	}
}
