<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\StoresData;
use Tribe\WME\Sitebuilder\Contracts\ManagesDomain;
use Tribe\WME\Sitebuilder\Services\Domain;
use WP_Error;

class GoLive extends Wizard {

	use StoresData;

	const DATA_STORE_NAME = '_sitebuilder_go_live';
	const REWRITE_TAG     = 'domain-purchase-webhook';

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

		add_action( 'init', [ $this, 'action__init' ] );
		add_action( 'template_redirect', [ $this, 'action__template_redirect' ] );
		add_filter( 'query_vars', [ $this, 'filter__query_vars' ] );

		$this->add_ajax_action( 'wizard_started', [ $this, 'telemetryWizardStarted' ] );
		$this->add_ajax_action( 'verify-domain', [ $this, 'verifyDomain' ] );
		$this->add_ajax_action( 'search-domains', [ $this, 'searchDomains' ] );
		$this->add_ajax_action( 'create-purchase-flow', [ $this, 'createPurchaseFlow' ] );
		$this->add_ajax_action( 'check-purchase-status', [ $this, 'checkPurchaseStatus' ] );
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
			'verifyingUrl'          => $this->getData()->get( 'verifying_domain', '' ),
			'domainSearchUrl'       => esc_url( 'https://my.nexcess.net/domain-search' ),
		];
	}

	/**
	 * Action: init
	 *
	 * Add rewrite rule to receive domain purchase webhook.
	 */
	public function action__init() {
		add_rewrite_rule( '^' . self::REWRITE_TAG . '$', 'index.php?' . self::REWRITE_TAG . '=true', 'top' );
	}

	/**
	 * Action: template_redirect
	 *
	 * Handle webhook delivery.
	 */
	public function action__template_redirect() {
		$isEndpoint = get_query_var( self::REWRITE_TAG );

		if ( empty( $isEndpoint ) ) {
			return;
		}

		nocache_headers();
		$this->handleWebhook();

		exit;
	}

	/**
	 * Filter: query_vars
	 *
	 * Add domain rewrite tag.
	 *
	 * @param string[] $vars
	 *
	 * @return string[]
	 */
	public function filter__query_vars( $vars ) {
		$vars[] = self::REWRITE_TAG;

		return $vars;
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

		$this->getData()->set( 'verifying_domain', $domain )->save();

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
	 * AJAX: search domains.
	 */
	public function searchDomains() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return wp_send_json_error( new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator or log into the Nexcess portal to change the site domain.', 'nexcess-mapps' )
			), 403 );
		}

		// Verify the domain structure.
		$domain = ! empty( $_POST['domain'] )
			? Domain::parseDomain( $_POST['domain'] )
			: null;

		$domain = $this->domains->formatDomain( $domain );

		if ( empty( $domain ) ) {
			return wp_send_json_error( new WP_Error(
				'mapps-invalid-domain',
				sprintf(
					/* Translators: %1$s is the provided domain name. */
					__( '"%s" is not a valid domain name. Please check your spelling and try again.', 'nexcess-mapps' ),
					sanitize_text_field( $_POST['domain'] )
				)
			), 422 );
		}

		$response = $this->domains->searchAvailableDomains( $domain );

		if ( is_wp_error( $response ) ) {
			$companyName = _x( 'Nexcess', 'company name', 'nexcess-mapps' );
			$companyName = apply_filters( 'nexcess_mapps_branding_company_name', $companyName );

			return wp_send_json_error( new WP_Error(
				'mapps-search-domains-failure',
				sprintf(
					/* Translators: %1$s is the branded company name, %2$s is the API error message. */
					__( 'The %1$s API returned an error: %2$s', 'nexcess-mapps' ),
					$companyName,
					$response->get_error_message()
				)
			) );
		}

		$response_body = wp_remote_retrieve_body( $response );

		return wp_send_json_success( $response_body );
	}

	/**
	 * AJAX: create UI flow.
	 */
	public function createPurchaseFlow() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return wp_send_json_error( new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator or log into the Nexcess portal to change the site domain.', 'nexcess-mapps' )
			), 403 );
		}

		$selected_domains = $_POST['domains'];
		$request_domains  = [];

		foreach ( $selected_domains as $selected_domain ) {
			$domain_name = ! empty( $selected_domain['domain_name'] )
				? Domain::parseDomain( $selected_domain['domain_name'] )
				: null;

			if ( empty( $domain_name ) || empty( $selected_domain['package_id'] ) ) {
				continue;
			}

			$request_domains[] = [
				'domain_name' => $domain_name,
				'package_id'  => $selected_domain['package_id'],
			];
		}

		if ( empty( $request_domains ) ) {
			return wp_send_json_error( new WP_Error(
				'mapps-invalid-domains',
				sprintf(
					__( 'No valid domain names provided.', 'nexcess-mapps' )
				)
			), 422 );
		}

		$this->getData()
			->set( 'requested_domains', $request_domains )
			->delete( 'purchased_domains' )
			->save();

		$return_url   = admin_url( 'admin.php?page=sitebuilder#/wizard/go-live?nexcess=true&step=3' );
		$callback_url = site_url( self::REWRITE_TAG );

		$response = $this->domains->createPurchaseFlow( $request_domains, $return_url, $callback_url );

		if ( is_wp_error( $response ) ) {
			$companyName = _x( 'Nexcess', 'company name', 'nexcess-mapps' );
			$companyName = apply_filters( 'nexcess_mapps_branding_company_name', $companyName );

			return wp_send_json_error( new WP_Error(
				'mapps-create-ui-flow-failure',
				sprintf(
					/* Translators: %1$s is the branded company name, %2$s is the API error message. */
					__( 'The %1$s API returned an error: %2$s', 'nexcess-mapps' ),
					$companyName,
					$response->get_error_message()
				)
			) );
		}

		$response_body = wp_remote_retrieve_body( $response );

		if ( empty( $response_body['uuid'] ) ) {
			return wp_send_json_error( new WP_Error(
				'mapps-response-missing-property',
				__( 'Expected property `uuid` is missing.', 'nexcess-mapps' )
			) );
		}

		return wp_send_json_success( $response_body );
	}

	/**
	 * Handle webhook payload.
	 */
	public function handleWebhook() {
		$payload = file_get_contents( 'php://input' );

		if ( empty( $payload ) ) {
			status_header( 400 );
			wp_send_json_error();
			exit;
		}

		$payload = json_decode( $payload );

		if ( ! $this->isValidWebhookPayload( $payload ) || 'success' !== $payload->outcome->status ) {
			status_header( 400 );
			wp_send_json_error();
			exit;
		}

		$domains = $payload->outcome->details->purchased_domain;

		if ( ! is_array( $domains ) ) {
			$domains = (array) $domains;
		}

		$this->getData()
			->set( 'purchased_domains', $domains )
			->save();

		return wp_send_json_success();
	}

	/**
	 * Provide data for purchase status.
	 */
	public function checkPurchaseStatus() {
		return wp_send_json( [
			'requested_domains' => $this->getData()->get( 'requested_domains', [] ),
			'purchased_domains' => $this->getData()->get( 'purchased_domains', [] ),
		] );
	}

	/**
	 * Check if webhook payload is valid.
	 *
	 * @return bool
	 */
	protected function isValidWebhookPayload( $payload ) {
		if (
			empty( $payload->action )
			|| 'domain:add' !== $payload->action
			|| empty( $payload->outcome )
			|| empty( $payload->outcome->status )
			|| empty( $payload->outcome->details )
		) {
			return false;
		}

		return true;
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
			wp_send_json_error( new WP_Error(
				'mapps-capabilities-failure',
				__( 'You do not have permission to perform this action. Please contact a site administrator or log into the Nexcess portal to change the site domain.', 'wme-sitebuilder' )
			), 403 );
		}

		// Verify the domain structure.
		// phpcs:ignore WordPress.Security.NonceVerification.Missing
		$domain = ! empty( $_POST['domain'] ) ? $this->domains->parseDomain( $_POST['domain'] ) : null;
		$domain = $this->domains->formatDomain( $domain );

		if ( empty( $domain ) ) {
			wp_send_json_error( new WP_Error(
				'mapps-invalid-domain',
				sprintf(
					/* Translators: %1$s is the provided domain name. */
					__( '"%s" is not a valid domain name. Please check your spelling and try again.', 'wme-sitebuilder' ),
					sanitize_text_field( $_POST['domain'] ) // phpcs:ignore WordPress.Security.NonceVerification.Missing
				)
			), 422 );
		}

		$response = $this->domains->renameDomain( $domain );

		if ( is_wp_error( $response ) ) {
			wp_send_json_error( new WP_Error(
				'mapps-change-domain-failure',
				$response->get_error_message()
			) );
		}

		$this->getData()
			->set( 'complete', true )
			->delete( 'verifying_domain' )
			->save();

		do_action( 'wme_event_wizard_completed', 'golive' );

		wp_send_json_success( null, 202 );
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
