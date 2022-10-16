<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Contracts\ManagesDomain;
use WP_Error;

class GoLive extends Wizard {
	/**
	 * Option to indicate completion.
	 */
	const COMPLETED_OPTION_NAME = '_sitebuilder_go_live';

	/**
	 * Option to site domain being verified.
	 */
	const VERIFYING_OPTION_NAME = '_sitebuilder_verifying_domain';

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $wizard_slug = 'golive';

	/**
	 * @var string
	 */
	protected $ajax_action = 'sitebuilder-wizard-golive';

	/**
	 * @var ManagesDomain
	 */
	protected $domains;

	/**
	 * @var object
	 */
	protected $client;

	/**
	 * @var object
	 */
	protected $settings;

	/**
	 * Construct.
	 *
	 * @param ManagesDomain $domains
	 */
	public function __construct( ManagesDomain $domains ) {
		$this->domains = $domains;

		parent::__construct();
	}

	/**
	 * Register hooks.
	 */
	public function register_hooks() {
		parent::register_hooks();

		$this->add_ajax_action( 'wizard_started', [ $this, 'telemetryWizardStarted' ] );
		$this->add_ajax_action( 'verify-domain', [ $this, 'verifyDomain' ] );
	}

	/**
	 * Get properties.
	 *
	 * @return array
	 */
	public function props() {
		return [
			'canBeClosed'           => true,
			'autoLaunch'            => false,
			'domainRegistrationUrl' => esc_url( 'https://www.nexcess.net/domain-registration/' ),
			'verifyingUrl'          => get_option( self::VERIFYING_OPTION_NAME, '' ),
			'domainSearchUrl'       => esc_url( 'https://my.nexcess.net/domain-search' ),
		];
	}

	/**
	 * Telemetry: wizard started.
	 */
	public function telemetryWizardStarted() {
		do_action( 'wme_event_wizard_started', 'golive' );

		return wp_send_json_success();
	}

	/**
	 * Verify provided domain.
	 */
	public function verifyDomain() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return wp_send_json_error(new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator or log into the Nexcess portal to change the site domain.', 'wme-sitebuilder' )
			), 403);
		}

		// Verify the domain structure.
		$domain = ! empty( $_POST['domain'] ) ? $this->domains->parseDomain( $_POST['domain'] ) : null; // phpcs:ignore WordPress.Security.NonceVerification.Missing

		$domain = $this->domains->formatDomain( $domain );

		if ( empty( $domain ) ) {
			return wp_send_json_error(new WP_Error(
				'mapps-invalid-domain',
				sprintf(
					/* Translators: %1$s is the provided domain name. */
					__( '"%s" is not a valid domain name. Please check your spelling and try again.', 'wme-sitebuilder' ),
					sanitize_text_field( $_POST['domain'] ) // phpcs:ignore WordPress.Security.NonceVerification.Missing
				)
			), 422);
		}

		update_option( self::VERIFYING_OPTION_NAME, $domain, false );

		try {
			$data = $this->domains->isDomainUsable( $domain );

			return wp_send_json_success( $data );
		} catch ( \Exception $e ) {
			return wp_send_json_error(new WP_Error(
				'mapps-verify-domain-failure',
				$e->getMessage()
			));
		}
	}

	/**
	 * Action after wizard is completed.
	 *
	 * Performs search and replace on the site's database
	 * via mappsApi( 'v1/site/rename' ) request.
	 *
	 * @return mixed
	 */
	public function finish() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return wp_send_json_error(new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator or log into the Nexcess portal to change the site domain.', 'wme-sitebuilder' )
			), 403);
		}

		// Verify the domain structure.
		$domain = ! empty( $_POST['domain'] ) ? $this->domains->parseDomain( $_POST['domain'] ) : null; // phpcs:ignore WordPress.Security.NonceVerification.Missing

		$domain = $this->domains->formatDomain( $domain );

		if ( empty( $domain ) ) {
			return wp_send_json_error(new WP_Error(
				'mapps-invalid-domain',
				sprintf(
					/* Translators: %1$s is the provided domain name. */
					__( '"%s" is not a valid domain name. Please check your spelling and try again.', 'wme-sitebuilder' ),
					sanitize_text_field( $_POST['domain'] ) // phpcs:ignore WordPress.Security.NonceVerification.Missing
				)
			), 422);
		}

		do_action( 'wme_event_sitebuilder_rename_domain', $domain );

		update_option( self::COMPLETED_OPTION_NAME, true, false );
		delete_option( self::VERIFYING_OPTION_NAME );

		do_action( 'wme_event_wizard_completed', 'golive' );

		return wp_send_json_success( null, 202 );
	}
}
