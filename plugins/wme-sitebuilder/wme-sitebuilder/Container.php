<?php

namespace Tribe\WME\Sitebuilder;

use PhpZip\ZipFile;
use Psr\Log\LoggerInterface;
use StellarWP\Container\Container as BaseContainer;
use Symfony\Component\Filesystem\Filesystem;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\PayPal;
use Tribe\WME\Sitebuilder\Plugins\PaymentGateways\Stripe;
use Tribe\WME\Sitebuilder\Support\Downloader\PluginInstaller;
use Tribe\WME\Sitebuilder\Wizards\PaymentGatewayPayPal;
use Tribe\WME\Sitebuilder\Wizards\PaymentGatewayStripe;

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
			static::class                             => $this,
			self::class                               => $this,

			Plugin::class                             => function ( $app ) {
				return new Plugin(
					$app,
					$app->make( LoggerInterface::class )
				);
			},

			// Cards.
			Cards\FirstTimeConfiguration::class       => static function ( $app ) {
				return new Cards\FirstTimeConfiguration(
					$app->make(Wizards\FirstTimeConfiguration::class)
				);
			},
			Cards\GoLive::class                       => static function ($app) {
				return new Cards\GoLive(
					$app->make(Wizards\GoLive::class)
				);
			},
			Cards\GoogleAnalytics::class              => static function () {
				return new Cards\GoogleAnalytics();
			},
			Cards\Goals::class                        => null,
			Cards\LookAndFeel::class                  => static function ($app) {
				return new Cards\LookAndFeel(
					$app->make(Wizards\LookAndFeel::class)
				);
			},
			Cards\ManageProducts::class               => null,
			Cards\PaymentGateways::class              => null,
			Cards\SiteVisibility::class               => null,
			Cards\Shipping::class                     => static function ( $app ) {
				return new Cards\Shipping(
					$app->make( Plugins\Shipping::class ),
					$app->make( PluginInstaller::class )
				);
			},
			Cards\StoreSetup::class                   => static function ( $app ) {
				return new Cards\StoreSetup(
					$app->make( Wizards\StoreSetup::class )
				);
			},
			Cards\ShareYourSite::class                => null,

			// Default implementations of contracts.
			Contracts\ManagesDomain::class            => Services\Domain::class,

			// Factories.
			Contracts\Factory::class                  => function () {
				return new Factories\Factory( $this );
			},

			// Pages.
			Modules\StoreDetails::class               => static function ( $app ) {
				return new Modules\StoreDetails(
					[
						$app->make( Cards\StoreSetup::class ),
						$app->make( Cards\ManageProducts::class ),
						$app->make( Cards\Shipping::class ),
					],
					$app->make( Contracts\Factory::class )
				);
			},

			Modules\SiteBuilder::class                => static function ($app) {
				return new Modules\SiteBuilder(
					[
						$app->make(Cards\FirstTimeConfiguration::class),
						$app->make(Cards\LookAndFeel::class),
						$app->make(Cards\ShareYourSite::class),
						$app->make(Cards\Goals::class),
					]
				);
			},

			Modules\SiteSettings::class               => static function ($app) {
				return new Modules\SiteSettings(
					[
						$app->make(Cards\SiteVisibility::class),
						$app->make(Cards\GoogleAnalytics::class),
						$app->make(Cards\GoLive::class),
					]
				);
			},

			// Plugin Downloader.
			ZipFile::class                            => null,
			Filesystem::class                         => null,
			Support\Downloader\Downloader::class      => null,
			Support\Downloader\Plugin::class          => null,
			Support\Downloader\Extractor::class       => static function ( $app ) {
				return new Support\Downloader\Extractor(
					$app->make( ZipFile::class ),
					ABSPATH
				);
			},

			Support\Downloader\Installer::class       => static function ( $app ) {
				return new Support\Downloader\Installer(
					$app->make( Support\Downloader\Downloader::class ),
					$app->make( Support\Downloader\Extractor::class ),
					$app->make( Filesystem::class )
				);
			},

			Support\Downloader\PluginInstaller::class => static function ( $app ) {
				return new PluginInstaller(
					$app->make( Support\Downloader\Plugin::class ),
					$app->make( Support\Downloader\Installer::class )
				);
			},

			// Plugins.
			Plugins\Shipping::class                   => null,
			Plugins\PaymentGateways\PayPal::class     => null,
			Plugins\PaymentGateways\Stripe::class     => null,


			// Services.
			Services\Domain::class                    => null,
			Services\Logger::class                    => null,

			// Wizards.
			Wizards\FirstTimeConfiguration::class     => null,
			Wizards\GoLive::class                     => static function ( $app ) {
				return new Wizards\GoLive(
					$app->make( Contracts\ManagesDomain::class )
				);
			},
			Wizards\LookAndFeel::class                => null,
			Wizards\PaymentGatewayPayPal::class       => static function( $app ) {
				return new PaymentGatewayPayPal(
					$app->make( PayPal::class ),
					$app->make( PluginInstaller::class )
				);
			},
			Wizards\PaymentGatewayStripe::class       => static function( $app ) {
				return new PaymentGatewayStripe(
					$app->make( Stripe::class ),
					$app->make( PluginInstaller::class )
				);
			},
			Wizards\Shipping::class                   => static function ( $app ) {
				return new Wizards\Shipping(
					$app->make( Plugins\Shipping::class )
				);
			},
			Wizards\StoreSetup::class                 => null,

			// Implementations of external interfaces.
			LoggerInterface::class                    => Services\Logger::class,
		];
	}
}
