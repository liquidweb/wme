<?php

namespace Tribe\WME\Sitebuilder;

use Psr\Log\LoggerInterface;
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
			// Prevent recursion by letting the container resolve itself if needed.
			static::class                         => $this,
			self::class                           => $this,

			Plugin::class                         => function ( $app ) {
				return new Plugin(
					$app,
					$app->make( LoggerInterface::class )
				);
			},

			// Cards.
			Cards\FirstTimeConfiguration::class   => function ( $app ) {
				return new Cards\FirstTimeConfiguration(
					$app->make( Wizards\FirstTimeConfiguration::class )
				);
			},
			Cards\GoLive::class                   => function ( $app ) {
				return new Cards\GoLive(
					$app->make( Wizards\GoLive::class )
				);
			},
			Cards\LookAndFeel::class              => function ( $app ) {
				return new Cards\LookAndFeel(
					$app->make( Wizards\LookAndFeel::class )
				);
			},
			Cards\ManageProducts::class           => null,
			Cards\PaymentGateways::class          => null,
			Cards\Shipping::class                 => function ( $app ) {
				return new Cards\Shipping(
					$app->make( Plugins\Shipping::class )
				);
			},
			Cards\StoreSetup::class               => function ( $app ) {
				return new Cards\StoreSetup(
					$app->make( Wizards\StoreSetup::class )
				);
			},

			// Default implementations of contracts.
			Contracts\ManagesDomain::class        => Services\Domain::class,

			// Pages.
			Modules\StoreDetails::class           => function ( $app ) {
				return new Modules\StoreDetails(
					[
						$app->make( Cards\StoreSetup::class ),
						$app->make( Cards\ManageProducts::class ),
						$app->make( Cards\Shipping::class ),
					]
				);
			},

			Modules\SiteBuilder::class            => function ( $app ) {
				return new Modules\SiteBuilder(
					[
						$app->make( Cards\FirstTimeConfiguration::class ),
						$app->make( Cards\LookAndFeel::class ),
						$app->make( Cards\GoLive::class ),
					]
				);
			},

			// Plugins.
			Plugins\Shipping::class               => null,

			// Services.
			Services\Domain::class                => null,
			Services\Logger::class                => null,

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
			Wizards\Shipping::class               => function ( $app ) {
				return new Wizards\Shipping(
					$app->make( Plugins\Shipping::class )
				);
			},
			Wizards\StoreSetup::class             => null,

			// Implementations of external interfaces.
			LoggerInterface::class                => Services\Logger::class,
		];
	}
}
