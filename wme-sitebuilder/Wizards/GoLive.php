<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Nexcess\MAPPS\Support\Branding;
use Nexcess\MAPPS\Support\Helpers;
use Tribe\WmeBackendStarter\Wizard;
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
	 * @var object
	 */
	protected $domain_changes;

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
	 * @param object $domain_changes
	 * @param object $client
	 * @param object $settings
	 */
	public function __construct( $domain_changes, $client, $settings ) {
		$this->domain_changes = $domain_changes;
		$this->client         = $client;
		$this->settings       = $settings;

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
		$domain = ! empty( $_POST['domain'] ) ? Helpers::parseDomain( $_POST['domain'] ) : null; // phpcs:ignore WordPress.Security.NonceVerification.Missing

		$domain = $this->domain_changes->formatDomain( $domain );

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
			$data = $this->client->checkDomainUsable( $domain );

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
		$domain = ! empty( $_POST['domain'] ) ? Helpers::parseDomain( $_POST['domain'] ) : null; // phpcs:ignore WordPress.Security.NonceVerification.Missing

		$domain = $this->domain_changes->formatDomain( $domain );

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

		// Finally, send the request to the MAPPS API.
		$response = $this->mappsApi('v1/site/rename', [
			'method' => 'POST',
			'body'   => [
				'domain' => $domain,
			],
		]);

		if ( is_wp_error( $response ) ) {
			return wp_send_json_error(new WP_Error(
				'mapps-change-domain-failure',
				sprintf(
					/* Translators: %1$s is the branded company name, %2$s is the API error message. */
					__( 'The %1$s API returned an error: %2$s', 'wme-sitebuilder' ),
					Branding::getCompanyName(),
					$response->get_error_message()
				)
			));
		}

		update_option( self::COMPLETED_OPTION_NAME, true, false );
		delete_option( self::VERIFYING_OPTION_NAME );

		do_action( 'wme_event_wizard_completed', 'golive' );

		return wp_send_json_success( null, 202 );
	}

	/**
	 * Send a request to the MAPPS API.
	 *
	 * @param string  $endpoint The API endpoint.
	 * @param mixed[] $args     Optional. WP HTTP API arguments, which will be merged with defaults.
	 *                          {@link https://developer.wordpress.org/reference/classes/WP_Http/request/#parameters}.
	 *
	 * @return mixed[]|WP_Error Either a response array or a WP_Error object, same as wp_remote_request().
	 */
	protected function mappsApi( $endpoint, $args = [] ) {
		// Strip leading slashes.
		if ( 0 === mb_strpos( $endpoint, '/' ) ) {
			$endpoint = mb_substr( $endpoint, 1 );
		}

		return wp_remote_request(
			esc_url_raw( sprintf( '%s/api/%2$s', $this->settings->managed_apps_endpoint, $endpoint ) ),
			array_replace_recursive( $this->getDefaultRequestArguments(), $args )
		);
	}

	/**
	 * Retrieve default request arguments.
	 *
	 * This includes common headers, User-Agent, etc.
	 *
	 * @link https://developer.wordpress.org/reference/classes/WP_Http/request/#parameters
	 *
	 * @return mixed[] An array of default request arguments.
	 */
	protected function getDefaultRequestArguments() {
		$plugin_version = apply_filters( 'sitebuilder_nexcessmapps_plugin_version', 'unknown' );

		return [
			'user-agent' => sprintf( 'NexcessMAPPS/%1$s', $plugin_version ),
			'timeout'    => 30,
			'headers'    => [
				'Accept'        => 'application/json',
				'X-MAAPI-TOKEN' => $this->settings->managed_apps_token,
			],
		];
	}
}
