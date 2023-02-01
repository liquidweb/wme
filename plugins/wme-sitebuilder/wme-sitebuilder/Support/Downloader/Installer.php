<?php

namespace Tribe\WME\Sitebuilder\Support\Downloader;

class Installer {

	/**
	 * @var \Tribe\WME\Sitebuilder\Support\Downloader\Downloader
	 */
	protected $downloader;

	/**
	 * @var \Tribe\WME\Sitebuilder\Support\Downloader\Extractor
	 */
	protected $extractor;

	public function __construct( Downloader $downloader, Extractor $extractor ) {
		$this->downloader = $downloader;
		$this->extractor  = $extractor;
	}

	/**
	 * @param  string  $url          The URL to the zip file.
	 * @param  string  $file_name    The file name, without extension.
	 * @param  string  $destination  The destination directory to extract the zip to.
	 *
	 * @throws \PhpZip\Exception\ZipException
	 * @return bool
	 */
	public function install( $url, $file_name, $destination ) {
		$file = $this->downloader->download_zip( $url, $file_name );

		$this->extractor->unzip( $file, $destination );

		return true;
	}

}
