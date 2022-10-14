<?php

namespace Tribe\WME\Sitebuilder\Concerns;

trait HasCommands {

	/**
	 * Create a new WP-CLI command instance.
	 *
	 * @param string  $command   The command to run.
	 * @param mixed[] $arguments Optional. An array of arguments. Numeric keys will be treated as
	 *                           [positional] arguments, while strings will be treated as options.
	 *                           Default is empty.
	 */
	protected function makeCommand( $command, array $arguments = [] ) {
		/**
		 * For Nexcess MAPPS mu-plugin, this should be
		 * \Nexcess\MAPPS\Support\ConsoleCommand.
		 */
		$classname = apply_filters( 'sitebuilder_classname_console_command', null );

		if ( null === $classname ) {
			return;
		}

		return new $classname( $command, $arguments );
	}
}
