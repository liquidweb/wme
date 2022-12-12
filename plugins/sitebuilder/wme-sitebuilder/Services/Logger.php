<?php

/**
 * A centralized, PSR-3 compliant logger.
 */

namespace Tribe\WME\Sitebuilder\Services;

use Psr\Log\InvalidArgumentException;
use Psr\Log\LoggerInterface;
use Psr\Log\LoggerTrait;
use Psr\Log\LogLevel;

class Logger implements LoggerInterface {

	use LoggerTrait;

	/**
	 * A cache of log levels and whether or not they should be logged.
	 *
	 * @var Array<string,bool>
	 */
	protected $levels = [];

	/**
	 * All valid log levels, used for validation.
	 *
	 * @var Array<string>
	 */
	protected $validLevels = [
		LogLevel::EMERGENCY,
		LogLevel::ALERT,
		LogLevel::CRITICAL,
		LogLevel::ERROR,
		LogLevel::WARNING,
		LogLevel::NOTICE,
		LogLevel::INFO,
		LogLevel::DEBUG,
	];

	/**
	 * Logs with an arbitrary level.
	 *
	 * @param mixed        $level   The log level.
	 * @param string       $message The log message.
	 * @param Array<mixed> $context The log context.
	 *
	 * @throws \InvalidArgumentException If given an invalid log level.
	 */
	public function log( $level, $message, array $context = [] ) {
		if ( ! in_array( $level, $this->validLevels, true ) ) {
			// PSR-3 defines $level as "mixed", so we'll do some type checks.
			throw new InvalidArgumentException(
				is_scalar( $level ) ? sprintf( '"%s" is not a valid log level.', $level ) : 'Invalid log level.'
			);
		}

		if ( ! $this->shouldLogMessageLevel( $level ) ) {
			return;
		}

		$this->writeLogMessage( $this->formatLogMessage( $level, $message, $context ), $level );
	}

	/**
	 * Format a message for writing to the system logger.
	 *
	 * @param string  $level
	 * @param string  $message
	 * @param mixed[] $context
	 *
	 * @return string The formatted log message.
	 */
	protected function formatLogMessage( $level, $message, array $context = [] ) {
		$output = sprintf( '[%1$s] %2$s', $level, $message );

		if ( ! empty( $context ) ) {
			foreach ( $context as $key => $value ) {
				// Clean up the presentation of exceptions.
				if ( $value instanceof \Exception ) {
					$value = (string) $value;
				}

                // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_print_r
				$output .= "\n\t[{$key}] " . print_r( $value, true );
			}
		}

		return $output;
	}

	/**
	 * Determine whether or not the current $level should be logged.
	 *
	 * @param string $level
	 *
	 * @return bool True if a message at this level should be logged, false otherwise.
	 */
	protected function shouldLogMessageLevel( $level ) {
		if ( empty( $this->levels[ $level ] ) ) {
			$should_log = true;

			// Only log notice-level and lower if E_NOTICE is included in the error_reporting bitmask.
			if ( in_array( $level, [ LogLevel::NOTICE, LogLevel::INFO, LogLevel::DEBUG ], true ) ) {
				$should_log = (bool) ( (int) ini_get( 'error_reporting' ) & E_NOTICE );

				// Furthermore, only log debug messages if WP_DEBUG is true.
				if ( $should_log && LogLevel::DEBUG === $level ) {
					$should_log = defined( 'WP_DEBUG' ) && WP_DEBUG;
				}
			}

			$this->levels[ $level ] = $should_log;
		}

		return $this->levels[ $level ];
	}

	/**
	 * Write the given log message.
	 *
	 * @param string $message The formatted message.
	 * @param string $level   The log level.
	 */
	protected function writeLogMessage( $message, $level ) {
        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
		error_log( $message, 0 );
	}
}
