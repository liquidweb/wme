<?php

namespace Tribe\WME\Sitebuilder\Contracts;

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
	public function formatDomain( $domain );

	/**
	 * Determine if the domain name is valid.
	 *
	 * @param string|false|null $domain Expected to be only the domain name (no protocol) and formatted by formatDomain().
	 *
	 * @return bool
	 */
	public function isDomainValid( $domain );

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
	 * @return mixed[]|\WP_Error
	 */
	public function searchAvailableDomains( $domain );
}
