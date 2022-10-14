<?php

namespace Tribe\WME\Sitebuilder;

use StellarWP\Container\Container as BaseContainer;

class Container extends BaseContainer {

	/**
	 * Retrieve a mapping of abstract identifiers to callables.
	 *
	 * When an abstract is requested through the container, the container will find the given
	 * dependency in this array, execute the callable, and return the result.
	 *
	 * @return Array<string,callable|object|string|null> A mapping of abstracts to callables.
	 *
	 * @codeCoverageIgnore
	 */
	public function config() {
		return [
			// Default implementations of contracts.
			Contracts\ManagesDomain::class        => Services\Domain::class,

			// Cards.
			Cards\FirstTimeConfiguration::class   => null,
			Cards\GoLive::class                   => null,
			Cards\LookAndFeel::class              => null,
			Cards\ManageProducts::class           => null,
			Cards\PaymentGateways::class          => null,
			Cards\Shipping::class                 => null,
			Cards\StoreSetup::class               => null,

			// Wizards.
			Wizards\FirstTimeConfiguration::class => null,
			Wizards\GoLive::class                 => function ( $app ) {
				return new Wizards\GoLive(
					$app->make( Contracts\ManagesDomain::class )
				);
			},
			Wizards\LookAndFeel::class            => null,
			Wizards\PaymentGatewayPayPal::class   => null,
			Wizards\PaymentGatewayStripe::class   => null,
			Wizards\Shipping::class               => null,
			Wizards\StoreSetup::class             => null,
		];
	}
}
