<?php

namespace Nexcess\MAPPS\Support;

use Nexcess\MAPPS\Exceptions\ConsoleException;

class ConsoleResponse {

	/**
	 * @var string The resolved command that was invoked.
	 */
	protected $command;

	/**
	 * @var string STDERR from the command.
	 */
	protected $errors;

	/**
	 * @var int The exit code from the command.
	 */
	protected $exit_code;

	/**
	 * @var string STDOUT from the command.
	 */
	protected $output;

	/**
	 * Construct a new ConsoleResponse object.
	 *
	 * @param string $command   The resolved command that was invoked.
	 * @param int    $exit_code The exit code from the command.
	 * @param string $output    Optional. STDOUT from the command. Default is empty.
	 * @param string $errors    Optional. STDERR from the command. Default is empty.
	 */
	public function __construct( $command, $exit_code, $output = '', $errors = '' ) {
		$this->command   = (string) $command;
		$this->exit_code = (int) $exit_code;
		$this->output    = (string) $output;
		$this->errors    = (string) $errors;
	}

	/**
	 * Retrieve the exact command that was called.
	 *
	 * @return string The full command.
	 */
	public function getCommand() {
		return $this->command;
	}

	/**
	 * Retrieve the command errors.
	 *
	 * @return string STDERR from the command.
	 */
	public function getErrors() {
		return trim( $this->errors );
	}

	/**
	 * Retrieve the exit code.
	 *
	 * @return int The exit code from the command.
	 */
	public function getExitCode() {
		return $this->exit_code;
	}

	/**
	 * Retrieve the command output.
	 *
	 * @return string STDOUT from the command.
	 */
	public function getOutput() {
		return trim( $this->output );
	}

	/**
	 * Determine whether or not the command was successful.
	 *
	 * @param bool $throw Optional. If true, a ConsoleException will be thrown if the command was
	 *                    unsuccessful. Default is false.
	 *
	 * @throws \Nexcess\MAPPS\Exceptions\ConsoleException If $throw is true and the command exited
	 *                                                    with a non-zero exit code.
	 *
	 * @return bool True if the command was successful (a zero exit code) or false if something
	 *              went wrong.
	 */
	public function wasSuccessful( $throw = false ) {
		$successful = 0 === $this->exit_code;

		if ( $throw && ! $successful ) {
			throw new ConsoleException( sprintf(
				/* Translators: %1$d is the command's exit code. */
				__( 'Received a non-zero exit code: %1$d', 'nexcess-mapps' ),
				$this->exit_code
			), $this->exit_code );
		}

		return $successful;
	}
}
