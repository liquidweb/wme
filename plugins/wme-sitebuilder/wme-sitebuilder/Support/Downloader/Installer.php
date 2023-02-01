<?php

namespace Tribe\WME\Sitebuilder\Support\Downloader;

use Symfony\Component\Filesystem\Filesystem;

class Installer {

	/**
	 * @var \Tribe\WME\Sitebuilder\Support\Downloader\Downloader
	 */
	protected $downloader;

	/**
	 * @var \Tribe\WME\Sitebuilder\Support\Downloader\Extractor
	 */
	protected $extractor;

	/**
	 * @var \Symfony\Component\Filesystem\Filesystem
	 */
	protected $filesystem;

	public function __construct( Downloader $downloader, Extractor $extractor, Filesystem $filesystem ) {
		$this->downloader = $downloader;
		$this->extractor  = $extractor;
		$this->filesystem = $filesystem;
	}

	/**
	 * Unzip a file to a specific directory.
	 *
	 * @param  string  $url          The URL to the zip file.
	 * @param  string  $file_name    The file name, without extension.
	 * @param  string  $destination  The destination directory to extract the zip to.
	 * @param  bool    $clean        Ensure we delete the folder before extracting.
	 *
	 * @throws \PhpZip\Exception\ZipException|\Symfony\Component\Filesystem\Exception\IOException
	 *
	 * @return bool
	 */
	public function install( $url, $file_name, $destination, $clean = true ) {
		$file      = $this->downloader->download_zip( $url, $file_name );
		$directory = trailingslashit( $destination ) . $file_name;

		if ( $clean && $this->filesystem->exists( $directory ) ) {
			$this->filesystem->remove( $directory );
		}

		$this->extractor->unzip( $file, $destination );

		return true;
	}

}
