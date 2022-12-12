<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\StoresData;

class StoreSetup extends Wizard {

	use StoresData;

	const DATA_STORE_NAME      = '_sitebuilder_store_setup';
	const FIELD_ADDRESSLINEONE = 'addressLineOne';
	const FIELD_ADDRESSLINETWO = 'addressLineTwo';
	const FIELD_CITY           = 'city';
	const FIELD_STATE          = 'state';
	const FIELD_REGION         = 'region';
	const FIELD_POSTCODE       = 'postCode';
	const FIELD_CURRENCY       = 'currency';
	const FIELD_PRODUCTTYPES   = 'productTypes';
	const FIELD_PRODUCTCOUNT   = 'productCount';

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder-store-details';

	/**
	 * @var string
	 */
	protected $wizard_slug = 'store-setup';

	/**
	 * @var string
	 */
	protected $ajax_action = 'sitebuilder-wizard-store-setup';

	/**
	 * @var string[]
	 */
	protected $field_values = [];

	/**
	 * @var array
	 */
	public $errors = [];

	/**
	 * Construct.
	 */
	public function __construct() {
		parent::__construct();

		$this->add_ajax_action( 'wizard_started', [ $this, 'telemetryWizardStarted' ] );
	}

	/**
	 * Telemetry: wizard started.
	 */
	public function telemetryWizardStarted() {
		do_action( 'wme_event_wizard_started', 'store-setup' );

		return wp_send_json_success();
	}

	/**
	 * Get wizard properties.
	 *
	 * @return Array<mixed>
	 */
	public function props() {
		return [
			'addressLineOne' => $this->getAddressLineOne(),
			'addressLineTwo' => $this->getAddressLineTwo(),
			'region'         => $this->getRegion(),
			'state'          => $this->getState(),
			'city'           => $this->getCity(),
			'postCode'       => $this->getPostcode(),
			'currency'       => $this->getCurrency(),
			'productTypes'   => $this->getProductTypes(),
			'productCount'   => $this->getProductCount(),
			'currencies'     => $this->getWoocommerceCurrencies(),
			'regions'        => $this->getWoocommerceRegions(),
			'states'         => $this->getWoocommerceStates(),
			'locales'        => $this->getWoocommerceLocales(),
			'completed'      => $this->isComplete(),
		];
	}

	/**
	 * Finish.
	 */
	public function finish() {
		$fields = [
			self::FIELD_ADDRESSLINEONE,
			self::FIELD_ADDRESSLINETWO,
			self::FIELD_CITY,
			self::FIELD_STATE,
			self::FIELD_REGION,
			self::FIELD_POSTCODE,
			self::FIELD_CURRENCY,
			self::FIELD_PRODUCTTYPES,
			self::FIELD_PRODUCTCOUNT,
		];

		foreach ( $fields as $field ) {
			$method_name = sprintf( 'set%s', ucfirst( $field ) );

			if ( ! method_exists( $this, $method_name ) ) {
				// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				trigger_error( sprintf( 'Method <code>%s</code> to save <code>%s</code> field is not defined.', esc_html( $method_name ), esc_html( $field ) ), E_USER_WARNING );

				continue;
			}

			$callable = [ $this, $method_name ];

			if ( ! is_callable( $callable ) ) {
				// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				trigger_error( sprintf( 'Method <code>%s</code> to save <code>%s</code> field is defined but not callable.', esc_html( $method_name ), esc_html( $field ) ), E_USER_WARNING );

				continue;
			}

			// phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( ! array_key_exists( $field, $_POST ) ) {
				// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
				trigger_error( sprintf( 'Field <code>%s</code> is absent in $_POST global.', esc_html( $field ) ), E_USER_WARNING );

				continue;
			}

			// phpcs:ignore WordPress.Security.NonceVerification.Missing
			call_user_func( $callable, $_POST[ $field ] );
		}

		$this->saveRegionAndState();

		if ( ! empty( $this->errors ) ) {
			$this->getData()->set( 'complete', false )->save();

			wp_send_json_error( $this->errors );
		}

		$this->getData()->set( 'complete', true )->save();
		$this->getData()->save();

		do_action( 'wme_event_wizard_completed', 'store-setup' );

		wp_send_json_success();
	}

	/**
	 * Gets the WooCommerce Address Line One.
	 *
	 * @return string
	 */
	public function getAddressLineOne() {
		if ( empty( $this->field_values[ self::FIELD_ADDRESSLINEONE ] ) ) {
			$this->field_values[ self::FIELD_ADDRESSLINEONE ] = WC()->countries->get_base_address();
		}

		return $this->field_values[ self::FIELD_ADDRESSLINEONE ];
	}

	/**
	 * Sets the WooCommerce Address Line One.
	 *
	 * @param string $address_one
	 */
	public function setAddressLineOne( $address_one ) {
		$address_one = filter_var( $address_one, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( $address_one === $this->getAddressLineOne() ) {
			return;
		}

		if ( update_option( 'woocommerce_store_address', $address_one ) ) {
			return;
		}

		$this->errors[] = [ self::FIELD_ADDRESSLINEONE => __( 'Invalid Address Line 1', 'wme-sitebuilder' ) ];
	}

	/**
	 * Gets the WooCommerce Address Line Two.
	 *
	 * @return string
	 */
	public function getAddressLineTwo() {
		if ( empty( $this->field_values[ self::FIELD_ADDRESSLINETWO ] ) ) {
			$this->field_values[ self::FIELD_ADDRESSLINETWO ] = WC()->countries->get_base_address_2();
		}

		return $this->field_values[ self::FIELD_ADDRESSLINETWO ];
	}

	/**
	 * Sets the WooCommerce Address Line Two.
	 *
	 * @param string $address_two
	 */
	public function setAddressLineTwo( $address_two ) {
		$address_two = filter_var( $address_two, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( $address_two === $this->getAddressLineTwo() ) {
			return;
		}

		if ( update_option( 'woocommerce_store_address_2', $address_two ) ) {
			return;
		}

		$this->errors[] = [ self::FIELD_ADDRESSLINETWO => __( 'Invalid Address Line 2', 'wme-sitebuilder' ) ];
	}

	/**
	 * Gets the WooCommerce City.
	 *
	 * @return string
	 */
	public function getCity() {
		if ( empty( $this->field_values[ self::FIELD_CITY ] ) ) {
			$this->field_values[ self::FIELD_CITY ] = WC()->countries->get_base_city();
		}

		return $this->field_values[ self::FIELD_CITY ];
	}

	/**
	 * Sets the WooCommerce City.
	 *
	 * @param string $city
	 */
	public function setCity( $city ) {
		$city = filter_var( $city, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( $city === $this->getCity() ) {
			return;
		}

		if ( update_option( 'woocommerce_store_city', $city ) ) {
			return;
		}

		$this->errors[] = [ self::FIELD_CITY => __( 'Invalid City', 'wme-sitebuilder' ) ];
	}

	/**
	 * Gets the WooCommerce Store Region.
	 *
	 * @return string
	 */
	public function getRegion() {
		if ( empty( $this->field_values[ self::FIELD_REGION ] ) ) {
			$base                                     = wc_get_base_location();
			$this->field_values[ self::FIELD_REGION ] = $base['country'];
		}

		return $this->field_values[ self::FIELD_REGION ];
	}

	/**
	 * Sets the region property.
	 *
	 * Glued together with state in $this->saveRegionAndState()
	 *
	 * @see $this->saveRegionAndState()
	 *
	 * @param string $region
	 */
	public function setRegion( $region ) {
		$region = filter_var( $region, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( $region === $this->getRegion() ) {
			return;
		}

		$this->field_values[ self::FIELD_REGION ] = $region;
	}

	/**
	 * Gets the WooCommerce Store State.
	 *
	 * @return string
	 */
	public function getState() {
		if ( empty( $this->field_values[ self::FIELD_STATE ] ) ) {
			$base                                    = wc_get_base_location();
			$this->field_values[ self::FIELD_STATE ] = $base['state'];
		}

		return $this->field_values[ self::FIELD_STATE ];
	}

	/**
	 * Sets the state property.
	 *
	 * Glued together with region in $this->saveRegionAndState()
	 *
	 * @see $this->saveRegionAndState()
	 *
	 * @param string $state
	 */
	public function setState( $state ) {
		$state = filter_var( $state, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( $this->getState() === $state ) {
			return;
		}

		$this->field_values[ self::FIELD_STATE ] = $state;
	}

	/**
	 * Gets the WooCommerce Postal Code.
	 *
	 * @return string
	 */
	public function getPostcode() {
		if ( empty( $this->field_values[ self::FIELD_POSTCODE ] ) ) {
			$this->field_values[ self::FIELD_POSTCODE ] = WC()->countries->get_base_postcode();
		}

		return $this->field_values[ self::FIELD_POSTCODE ];
	}

	/**
	 * Sets the WooCommerce PostCode.
	 *
	 * @param string $postcode
	 */
	public function setPostcode( $postcode ) {
		$postcode = filter_var( $postcode, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( $postcode === $this->getPostcode() ) {
			return;
		}

		if ( update_option( 'woocommerce_store_postcode', $postcode ) ) {
			return;
		}

		$this->errors[] = [ self::FIELD_POSTCODE => __( 'Invalid Postcode', 'wme-sitebuilder' ) ];
	}

	/**
	 * Gets the WooCommerce Currency.
	 *
	 * @return string
	 */
	public function getCurrency() {
		if ( empty( $this->field_values[ self::FIELD_CURRENCY ] ) ) {
			$this->field_values[ self::FIELD_CURRENCY ] = get_woocommerce_currency();
		}

		return $this->field_values[ self::FIELD_CURRENCY ];
	}

	/**
	 * Sets the WooCommerce Currency.  Currency must match once of the keys
	 * provided by get_woocommerce_currencies().
	 *
	 * @param string $currency
	 */
	public function setCurrency( $currency ) {
		$currency = filter_var( $currency, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( $currency === $this->getCurrency() ) {
			return;
		}

		if ( ! in_array( $currency, array_keys( get_woocommerce_currencies() ), true ) ) {
			$this->errors[] = [ self::FIELD_CURRENCY => __( 'Invalid Currency', 'wme-sitebuilder' ) ];
			return;
		}

		if ( update_option( 'woocommerce_currency', $currency ) ) {
			return;
		}

		$this->errors[] = [ self::FIELD_CURRENCY => __( 'Invalid Currency', 'wme-sitebuilder' ) ];
	}

	/**
	 * Gets the productType.
	 *
	 * @return mixed
	 */
	public function getProductTypes() {
		return $this->getData()->get( 'producttype', [] );
	}

	/**
	 * Sets the productType.
	 *
	 * @param array $new_product_types
	 */
	public function setProductTypes( $new_product_types = [] ) {
		$new_product_types = filter_var( $new_product_types, FILTER_SANITIZE_FULL_SPECIAL_CHARS, [ 'flags' => FILTER_FORCE_ARRAY ] );

		if ( empty( $new_product_types ) ) {
			return;
		}

		if ( ! empty( $this->getProductTypes() ) ) {
			return;
		}

		$this->getData()->set( 'producttype', $new_product_types );
	}

	/**
	 * Gets the productCount.
	 *
	 * @return string
	 */
	public function getProductCount() {
		return $this->getData()->get( 'productcount', '' );
	}

	/**
	 * Sets the productCount.
	 *
	 * @param string $new_product_count
	 */
	public function setProductCount( $new_product_count ) {
		$new_product_count = filter_var( $new_product_count, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( ! isset( $new_product_count ) || empty( $new_product_count ) ) {
			return;
		}

		// Prevent value from being updated.
		if ( ! empty( $this->getProductCount() ) ) {
			return;
		}

		$this->getData()->set( 'productcount', $new_product_count );
	}

	/**
	 * Sets the WooCommerce Country.
	 *
	 * Glues the region and state properties together.
	 */
	protected function saveRegionAndState() {
		$base_region_state = implode( ':', array_filter( wc_get_base_location() ) );
		$region_state      = $this->getRegion();

		// Region and State values should both be present.
		// Check the property rather than the getter to avoid default value.
		if ( ! empty( $region_state ) && ! empty( $this->getState() ) ) {
			$region_state .= sprintf( ':%s', $this->getState() );
		}

		if ( empty( $region_state ) ) {
			return;
		}

		if ( $base_region_state === $region_state ) {
			return;
		}

		if ( update_option( 'woocommerce_default_country', $region_state ) ) {
			return;
		}

		$this->errors[] = [ self::FIELD_REGION => __( 'Unable to save Region', 'wme-sitebuilder' ) ];
	}

	/**
	 * Returns all the available currencies from WooCommerce.
	 *
	 * @return array[]
	 */
	public function getWoocommerceCurrencies() {
		if ( ! function_exists( 'get_woocommerce_currencies' ) ) {
			return [];
		}

		$currencies = get_woocommerce_currencies();
		$structured = [];

		foreach ( $currencies as $value => $label ) {
			$structured[] = [
				'value' => $value,
				'label' => $label,
			];
		}

		return $structured;
	}

	/**
	 * Returns the regions for WooCommerce Region dropdown.
	 *
	 * @return Array<mixed>
	 */
	public function getWoocommerceRegions() {
		$regions = [];
		$wc      = WC();

		if ( $wc->countries ) {
			foreach ( $wc->countries->get_countries() as $country_key => $country_name ) {
				$country_state_key = esc_attr( $country_key );
				$label             = esc_html( $country_name );
				$regions[]         = [
					'country' => $country_name,
					'value'   => $country_state_key,
					'label'   => $label,
				];
			}
		}

		return $regions;
	}

	/**
	 * Returns the states for WooCommerce States dropdown.
	 *
	 * @return Array<mixed>
	 */
	public function getWoocommerceStates() {
		$wc_states = [];
		$wc        = WC();

		if ( $this->field_values['region'] ) {
			$states = $wc->countries->get_states( $this->field_values['region'] );

			if ( $states ) {
				foreach ( $states as $state_key => $state_value ) {
					$wc_states[] = [
						'value' => esc_attr( $state_key ),
						'label' => esc_attr( $state_value ),
					];
				}
			}
		}

		return $wc_states;
	}

	/**
	 * Returns the locales for displaying appropriate 'State' dropdown label.
	 *
	 * @return Array<mixed>
	 */
	public function getWoocommerceLocales() {
		return WC()->countries->get_country_locale();
	}

	/**
	 * Check if Wizard has been completed.
	 *
	 * @return bool
	 */
	public function isComplete() {
		return (bool) $this->getData()->get( 'complete', false );
	}
}
