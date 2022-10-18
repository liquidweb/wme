<?php

namespace Tribe\WME\Sitebuilder\Concerns;

use Tribe\WME\Sitebuilder\Support\ConsoleCommand;

trait InvokesCli {

	/**
	 * Create a new WP-CLI command instance.
	 *
	 * @param string  $command   The command to run.
	 * @param mixed[] $arguments Optional. An array of arguments. Numeric keys will be treated as
	 *                           [positional] arguments, while strings will be treated as options.
	 *                           Default is empty.
	 */
	protected function makeCommand( $command, array $arguments = [] ) {
		return new ConsoleCommand( $command, $arguments );
	}
}
