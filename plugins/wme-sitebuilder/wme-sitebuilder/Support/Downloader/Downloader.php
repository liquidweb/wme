<?php

namespace Tribe\WME\Sitebuilder\Support\Downloader;

class Downloader {

	/**
	 * Downloads a remote zip file and places in an extract folder.
	 *
	 * @param string $url
	 * @param string $file_name
	 * @param string $extract_dir
	 *
	 * @return string
	 */
	public function download_zip( $url, $file_name, $extract_dir = '/tmp' ) {
		$file = sprintf( '%s/%s.zip', $extract_dir, $file_name );

		file_put_contents( $file, file_get_contents( $url ) );

		return $file;
	}

}
