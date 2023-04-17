<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\StoresData;
use WP_Error;

/**
 * After Kadence template import, the site logo may be reset.
 * Restoration of the logo set in the FTC wizard is handled in
 * FirstTimeConfiguration::restoreLogoAfterKadenceImport().
 *
 * @see FirstTimeConfiguration::restoreLogoAfterKadenceImport()
 */
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
	 * @var string
	 */
	protected $kadence_cloud_data_url = 'https://patterns.startertemplatecloud.com/wp-json/kadence-cloud/v1/pages/?key=section';

	/**
	 * @var array
	 */
	protected $fields = [];

	/**
	 * @var array
	 */
	public $errors = [];

	/**
	 * Register hooks.
	 */
	public function register_hooks() {
		$this->add_ajax_action( 'wizard_started', [ $this, 'telemetryWizardStarted' ] );
		$this->add_ajax_action( 'kadence_cloud_section_data', [ $this, 'requestKadenceCloudSectionData' ] );

		add_filter( 'kadence_starter_get_templates_args', [ $this, 'filterKadenceStarterTemplateArgs' ] );

		parent::register_hooks();
	}

	/**
	 * Filter the Kadence Starter Template Request Args to ensure the Email and API Key are set when requesting template data.
	 *
	 * @param array $request_args
	 *
	 * @return array
	 */
	public function filterKadenceStarterTemplateArgs( $request_args ) {
		$kadence_pro_data = get_option( 'ktp_api_manager' );

		if ( isset( $kadence_pro_data ) && is_array( $kadence_pro_data ) ) {
			$request_args['api_email'] = ! empty( $request_args['api_email'] ) ? $request_args['api_email'] : $kadence_pro_data['activation_email'];
			$request_args['api_key']   = ! empty( $request_args['api_key'] ) ? $request_args['api_key'] : $kadence_pro_data['ktp_api_key'];
		}

		return $request_args;
	}

	/**
	 * Proxy the request to Kadence Cloud Data Section Data.
	 *
	 * @return void
	 */
	public function requestKadenceCloudSectionData() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator.', 'wme-sitebuilder' )
			), 403 );
		}

		$response = wp_remote_get( $this->kadence_cloud_data_url );
		// Early exit if there was an error.
		if ( is_wp_error( $response ) ) {
			wp_send_json_error( new WP_Error(
				'wme-sitebuilder-kadence-cloud-response-error',
				__( 'Unable to retrieve data from the Kadence Cloud Server.', 'wme-sitebuilder' )
			), 500 );
		}

		// Get the CSS from our response.
		$body_contents = wp_remote_retrieve_body( $response );

		// Early exit if there was an error.
		if ( is_wp_error( $body_contents ) ) {
			wp_send_json_error( new WP_Error(
				'wme-sitebuilder-kadence-cloud-response-error',
				__( 'Unable to retrieve data from the Kadence Cloud Server.', 'wme-sitebuilder' )
			), 500 );
		}

		$data = (array) json_decode( $body_contents, true );

		wp_send_json_success( $data );
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
			'nextUrl'     => apply_filters( 'wme_sitebuilder_next_url', '', $this->admin_page_slug, $this->wizard_slug ),
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
			// phpcs:disable WordPress.Security.NonceVerification.Missing
			if ( ! array_key_exists( $field, $_POST ) ) {
				// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				trigger_error( sprintf( 'Field <code>%s</code> is absent in $_POST global.', esc_html( $field ) ), E_USER_WARNING );

				continue;
			}

			if ( is_array( $_POST[ $field ] ) ) {
				$value = filter_var_array( $_POST[ $field ], FILTER_SANITIZE_FULL_SPECIAL_CHARS );
			} else {
				$value = filter_var( $_POST[ $field ], FILTER_SANITIZE_FULL_SPECIAL_CHARS );
			}
			// phpcs:enable WordPress.Security.NonceVerification.Missing

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
