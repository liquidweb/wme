<?php

namespace Tribe\WME\Sitebuilder\Contracts;

use WP_Error;

interface ManagesDomain {
	/**
	 * Extract the domain portion of a URL.
	 *
	 * @param string $url The URL to parse.
	 *
	 * @return string Only the domain of the given URL, or an empty string if one cannot be parsed.
	 */
	public static function parseDomain( $url );

	/**
	 * Format and filter the domain name.
	 *
	 * @param null|string $domain
	 *
	 * @return string|null|false
	 */
	public static function formatDomain( $domain );

	/**
	 * Make a request to change the domain of the site.
	 *
	 * @param string $domain
	 *
	 * @return true|WP_Error
	 */
	public function renameDomain( $domain );

	/**
	 * Confirm the domain is usable for the site.
	 *
	 * @param string $domain
	 *
	 * @return array Data indicating the various states of validation checks, or an empty array if unsuccessful.
	 */
	public function isDomainUsable( $domain );

	/**
	 * Search available domains based on provided domain name.
	 *
	 * @param string $domain
	 *
	 * @return array|WP_Error
	 */
	public function searchAvailableDomains( $domain );

	/**
	 * Create purchase flow.
	 *
	 * @param array[] $domains
	 * @param string  $return_url
	 * @param string  $callback_url
	 * @param string  $abort_url
	 *
	 * @return array|WP_Error
	 */
	public function createPurchaseFlow( $domains, $return_url, $callback_url, $abort_url = '' );
}
