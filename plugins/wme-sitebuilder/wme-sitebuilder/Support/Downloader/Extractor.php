<?php

namespace Tribe\WME\Sitebuilder\Support\Downloader;

use PhpZip\Exception\ZipException;
use PhpZip\ZipFile;

class Extractor {

	/**
	 * @var \PhpZip\ZipFile
	 */
	protected $zip;

	/**
	 * The server path to the root of the project.
	 *
	 * @var string
	 */
	protected $project_root;

	public function __construct( ZipFile $zip, $project_root ) {
		$this->zip          = $zip;
		$this->project_root = $project_root;
	}

	/**
	 * Unzip a file.
	 *
	 * @param  string  $file
	 * @param  string  $destination
	 *
	 * @throws \PhpZip\Exception\ZipException
	 *
	 * @return void
	 */
	public function unzip( $file, $destination ) {
		if ( ! str_starts_with( $destination, '/' ) ) {
			$destination = realpath( $this->project_root ) . '/' . $destination;
		}

		try {
			$this->zip->openFile( $file )
			          ->extractTo( $destination );
		} catch ( ZipException $e ) {
			$this->zip->close();

			throw $e;
		} finally {
			$this->zip->close();
		}

		// Clean up zip after successful extraction.
		unlink( $file );
	}

}
