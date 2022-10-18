<?php

/**
 * A way to invoke CLI commands from within the plugin, including support for the "nice" and
 * "timeout" commands.
 */

namespace Tribe\WME\Sitebuilder\Support;

class ConsoleCommand {

	/**
	 * Arguments that have been passed to the command.
	 *
	 * @var mixed[]
	 */
	protected $arguments;

	/**
	 * The command to be executed.
	 *
	 * @var string
	 */
	protected $command;

	/**
	 * The priority when using the "nice" command.
	 *
	 * @var int
	 */
	protected $priority = 18;

	/**
	 * The maximum number of seconds to run the command before timing out.
	 *
	 * @var int
	 */
	protected $timeout = 60;

	/**
	 * The full system path to the WP-CLI binary.
	 *
	 * @var string
	 */
	protected static $wpBinary;

	/**
	 * Create a new ConsoleCommand instance.
	 *
	 * @param string  $command   The command to run.
	 * @param mixed[] $arguments Optional. An array of arguments. Numeric keys will be treated as
	 *                           [positional] arguments, while strings will be treated as options.
	 *                           Default is empty.
	 */
	public function __construct( $command, array $arguments = [] ) {
		$this->command   = $command;
		$this->arguments = $arguments;
	}

	/**
	 * Execute the command.
	 *
	 * @return \Tribe\WME\Sitebuilder\Support\ConsoleResponse A representation of the console response.
	 */
	public function execute() {
		$arguments = array_map( 'escapeshellarg', $this->parseArguments( $this->arguments ) );

		// Construct the basic command.
		$command = trim( sprintf( '%s %s', $this->command, implode( ' ', $arguments ) ) );

		// If we're calling the WP-CLI binary, use the full system path.
		if ( 0 === mb_strpos( $command, 'wp ' ) ) {
			$command = $this->getWpBinary() . substr( $command, 2 );
		}

		// Set a timeout for all commands.
		$command = sprintf( 'timeout %d %s', $this->timeout, $command );

		// Finally, prefix all commands with nice.
		$command = sprintf( 'nice -n %d %s', $this->priority, $command );

		return $this->executeCommand( $command );
	}

	/**
	 * Set the command priority.
	 *
	 * @param int $priority The priority value, an integer between -20 and 19.
	 *
	 * @throws \OutOfRangeException If given an invalid $priority.
	 *
	 * @return self
	 */
	public function setPriority( $priority ) {
		$priority = (int) $priority;

		if ( $priority < -20 || $priority > 19 ) {
			throw new \OutOfRangeException(
				'The priority levels for the "nice" command range from -20—19. Run `man nice` for details.'
			);
		}

		$this->priority = $priority;

		return $this;
	}

	/**
	 * Set the command timeout.
	 *
	 * @param int $timeout The timeout value (in seconds).
	 *
	 * @throws \OutOfRangeException If given a value <= 0.
	 *
	 * @return self
	 */
	public function setTimeout( $timeout ) {
		$timeout = (int) $timeout;

		if ( $timeout <= 0 ) {
			throw new \OutOfRangeException( 'Timeout values must be greater than 0.' );
		}

		$this->timeout = $timeout;

		return $this;
	}

	/**
	 * Parse arguments passed to a command.
	 *
	 * @param mixed[] $arguments Optional. An array of arguments. Numeric keys will be treated as
	 *                           [positional] arguments, while strings will be treated as options.
	 *                           Default is empty.
	 *
	 * @return mixed[] An array of arguments, ready to be passed to a script. Note that the
	 *                 arguments are NOT escaped.
	 */
	protected function parseArguments( array $arguments = [] ) {
		array_walk( $arguments, function ( &$value, $key ) {
			if ( is_int( $key ) ) {
				$value = $value;
			} elseif ( is_array( $value ) ) {
				$value = sprintf( '%s=%s', $key, implode( ',', $value ) );
			} elseif ( is_bool( $value ) ) {
				$value = $value ? $key : null;
			} else {
				$value = sprintf( '%s=%s', $key, $value );
			}
		} );

		return array_filter( $arguments );
	}

	/**
	 * Execute the given command.
	 *
	 * @param string $command The full command to execute.
	 *
	 * @return \Tribe\WME\Sitebuilder\Support\ConsoleResponse A representation of the console response.
	 */
	protected function executeCommand( $command ) {
		// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.system_calls_exec
		exec( escapeshellcmd( $command ), $output, $code );

		return new ConsoleResponse( $command, $code, implode( PHP_EOL, $output ) );
	}

	/**
	 * Retrieve the PHP + WP-CLI binary combination we want to use while running WP-CLI.
	 *
	 * @return string The system path to a PHP binary.
	 */
	protected function getWpBinary() {
		if ( self::$wpBinary ) {
			return self::$wpBinary;
		}

		/*
		 * Construct an escaped string that expands the current PHP and WP-CLI binary paths.
		 *
		 * Note that we're using the PHP_BINDIR constant and adding "/php" instead of PHP_BINARY,
		 * as the latter will point to PHP-FPM.
		 *
		 * The expected output of this will look something like:
		 *
		 *     /opt/remi/php73/root/usr/bin/php /usr/local/bin/wp
		 */
		self::$wpBinary = sprintf(
			'%1$s %2$s',
			escapeshellarg( PHP_BINDIR . '/php' ),
			// phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.system_calls_shell_exec
			escapeshellarg( trim( (string) shell_exec( 'command -v wp' ) ) )
		);

		return self::$wpBinary;
	}
}
