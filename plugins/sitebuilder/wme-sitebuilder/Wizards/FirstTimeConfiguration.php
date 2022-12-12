<?php

namespace Tribe\WME\Sitebuilder\Wizards;

use Tribe\WME\Sitebuilder\Concerns\StoresData;

class FirstTimeConfiguration extends Wizard {

	use StoresData;

	const FIELD_LOGO      = 'logo';
	const FIELD_PASSWORD  = 'password';
	const FIELD_SITENAME  = 'siteName';
	const FIELD_TAGLINE   = 'tagLine';
	const FIELD_USERNAME  = 'username';
	const DATA_STORE_NAME = '_sitebuilder_ftc';

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $wizard_slug = 'ftc';

	/**
	 * @var string
	 */
	protected $ajax_action = 'sitebuilder-wizard-ftc';

	/**
	 * @var array
	 */
	protected $fields = [];

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
		$this->add_ajax_action( 'validateUsername', [ $this, 'validateUsername' ] );
	}

	/**
	 * Register hooks.
	 */
	public function register_hooks() {
		parent::register_hooks();

		add_action( 'current_screen', [ $this, 'autoLaunch' ] );
		add_action( 'kadence-starter-templates/after_all_import_execution', [ $this, 'restoreLogoAfterKadenceImport' ] );
	}

	/**
	 * Telemetry: wizard started.
	 */
	public function telemetryWizardStarted() {
		do_action( 'wme_event_wizard_started', 'ftc' );

		return wp_send_json_success();
	}

	/**
	 * Get properties.
	 *
	 * @return array
	 */
	public function props() {
		return [
			'username'    => $this->getUsername(),
			'completed'   => $this->isComplete(),
			'autoLaunch'  => false,
			'canBeClosed' => $this->isComplete(),
			'adminUrl'    => admin_url(),
			'site'        => [
				'siteName' => $this->getSitename(),
				'tagline'  => $this->getTagline(),
				'logo'     => [
					'id'  => $this->getLogoId(),
					'url' => $this->getLogoUrl(),
				],
			],
		];
	}

	/**
	 * AJAX sub-action to validate the provided username.
	 */
	public function validateUsername() {
		$username = sanitize_text_field( $_POST[ self::FIELD_USERNAME ] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		$errors   = [];

		if ( ! $this->isUsernameValid( $username ) ) {
			$errors[] = __( 'Username not valid.', 'wme-sitebuilder' );
		}

		if ( ! empty( $errors ) ) {
			wp_send_json_error( $errors, 400 );
		}

		wp_send_json_success();
	}

	/**
	 * Finish the wizard.
	 */
	public function finish() {
		$fields = [
			self::FIELD_LOGO,
			self::FIELD_SITENAME,
			self::FIELD_TAGLINE,
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

		$this->getData()->set( 'complete', true )->save();

		do_action( 'wme_event_wizard_completed', 'ftc' );

		$this->setUserCredentials();

		wp_send_json_success();
	}

	/**
	 * Check if Wizard has been completed.
	 *
	 * @return bool
	 */
	public function isComplete() {
		return (bool) $this->getData()->get( 'complete', false );
	}

	/**
	 * Auto launch the wizard.
	 *
	 * @action current_screen
	 */
	public function autoLaunch() {
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		if ( ! is_admin() || $this->isComplete() ) {
			return;
		}

		// Allow implementers to implicitely autolaunch the First Time Configuration Wizard.
		if ( ! apply_filters( 'wme_sitebuilder_autolaunch_wizard', false ) ) {
			return;
		}

		$screen = get_current_screen();

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( ! empty( $screen ) && sprintf( 'toplevel_page_%s', $this->admin_page_slug ) === $screen->id ) {
			return;
		}

		$redirect_url  = add_query_arg( 'page', $this->admin_page_slug, admin_url( 'admin.php' ) );
		$redirect_url .= sprintf( '#/wizard/%s', $this->wizard_slug );

		wp_safe_redirect( $redirect_url );

		exit;
	}

	/**
	 * Returns the current users user_login.
	 *
	 * @return string
	 */
	public function getUsername() {
		$user = wp_get_current_user();

		if ( empty( $user->user_login ) ) {
			return '';
		}

		return $user->user_login;
	}

	/**
	 * Returns the logo id if a logo exists, or 0.
	 *
	 * @return int
	 */
	public function getLogoId() {
		if ( empty( $this->fields['logo_id'] ) ) {
			$this->fields['logo_id'] = absint( get_option( 'site_logo', 0 ) );
		}

		return $this->fields['logo_id'];
	}

	/**
	 * Returns the logo url if a logo exists, an empty string otherwise.
	 *
	 * @return string
	 */
	public function getLogoUrl() {
		if ( empty( $this->getLogoId() ) ) {
			return '';
		}

		$url = wp_get_attachment_image_url( $this->getLogoId(), 'full' );

		if ( empty( $url ) ) {
			return '';
		}

		return $url;
	}

	/**
	 * Returns the logo id if a logo exists, or 0.
	 *
	 * @return int
	 */
	public function getLogo() {
		if ( empty( $this->fields[ self::FIELD_LOGO ] ) ) {
			$this->fields[ self::FIELD_LOGO ] = get_option( 'site_logo', 0 );
		}

		return (int) $this->fields[ self::FIELD_LOGO ];
	}

	/**
	 * Set logo ID.
	 *
	 * @param int $logo
	 */
	public function setLogo( $logo ) {
		if ( empty( $logo ) ) {
			update_option( 'site_logo', null );
			$this->getData()->set( 'logo', null );
			return;
		}

		$logo = absint( filter_var( $logo, FILTER_SANITIZE_NUMBER_INT ) );

		if ( empty( $logo ) ) {
			$this->errors[] = [ self::FIELD_LOGO => __( 'Invalid Logo', 'wme-sitebuilder' ) ];
			return;
		}

		if ( $logo === $this->getLogo() ) {
			return;
		}

		$this->getData()->set( 'logo', $logo );

		if ( update_option( 'site_logo', $logo ) ) {
			return;
		}

		$this->errors[] = [ self::FIELD_LOGO => __( 'Unable to save the Logo', 'wme-sitebuilder' ) ];
	}

	/**
	 * Get the current site name.
	 *
	 * @return string
	 */
	public function getSitename() {
		if ( empty( $this->fields[ self::FIELD_SITENAME ] ) ) {
			$this->fields[ self::FIELD_SITENAME ] = get_bloginfo( 'name' );
		}

		return $this->fields[ self::FIELD_SITENAME ];
	}

	/**
	 * Set the site name.
	 *
	 * @param string $sitename
	 */
	public function setSitename( $sitename ) {
		$sitename = filter_var( $sitename, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( $sitename === $this->getSitename() ) {
			return;
		}

		if ( ! update_option( 'blogname', $sitename ) ) {
			$this->errors[] = [ self::FIELD_SITENAME => __( 'Invalid Sitename', 'wme-sitebuilder' ) ];
		}
	}

	/**
	 * Get the current site tagline.
	 *
	 * @return string
	 */
	public function getTagline() {
		if ( empty( $this->fields[ self::FIELD_TAGLINE ] ) ) {
			$this->fields[ self::FIELD_TAGLINE ] = get_bloginfo( 'description' );
		}

		return $this->fields[ self::FIELD_TAGLINE ];
	}

	/**
	 * Set the site description (tagLine).
	 *
	 * @param string $tagline
	 */
	public function setTagline( $tagline ) {
		$tagline = filter_var( $tagline, FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( $tagline === $this->getTagline() ) {
			return;
		}

		if ( ! update_option( 'blogdescription', $tagline ) ) {
			$this->errors[] = [ self::FIELD_TAGLINE => __( 'Invalid Tagline', 'wme-sitebuilder' ) ];
		}
	}

	/**
	 * Set user's credentials.
	 */
	protected function setUserCredentials() {
		$user = wp_get_current_user();

		$updated_password = false;
		$updated_username = false;

		// phpcs:disable WordPress.Security.NonceVerification.Missing
		if ( isset( $_POST[ self::FIELD_PASSWORD ] ) ) {
			$password = sanitize_text_field( $_POST[ self::FIELD_PASSWORD ] );
			wp_set_password( $password, $user->ID );
			$updated_password = true;
		}

		if ( isset( $_POST[ self::FIELD_USERNAME ] ) ) {
			$username = sanitize_text_field( $_POST[ self::FIELD_USERNAME ] );

			if ( $user->user_login !== $username && $this->isUsernameValid( $username ) ) {
				global $wpdb;

				$updated_username = $wpdb->update(
					$wpdb->users,
					[ 'user_login' => $username ],
					[ 'ID' => $user->ID ]
				);
			}
		}
		// phpcs:enable

		if ( ! $updated_password && ! $updated_username ) {
			return;
		}

		do_action( 'wme_sitebuilder_user_password_updated', $user->ID );

		clean_user_cache( $user->ID );

		$user = wp_set_current_user( $user->ID );
		wp_set_auth_cookie( $user->ID );

		do_action( 'wp_login', $user->user_login, $user );
	}

	/**
	 * Validates the username entered.
	 *
	 * @param string $username The username to validate.
	 *
	 * @return bool True if the username is valid, false otherwise.
	 */
	protected function isUsernameValid( $username ) {
		if ( ! validate_username( $username ) ) {
			return false;
		}

		$illegal_usernames = (array) apply_filters('illegal_user_logins', [
			'adm',
			'admin',
			'admin1',
			'hostname',
			'manager',
			'qwerty',
			'root',
			'support',
			'sysadmin',
			'test',
			'user',
			'webmaster',
		]);

		$illegal_usernames = array_map( 'strtolower', $illegal_usernames );

		if ( in_array( mb_strtolower( $username ), $illegal_usernames, true ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Restore set logo after Kadence template import.
	 *
	 * @param string[] $selected_import_files
	 */
	public function restoreLogoAfterKadenceImport( $selected_import_files ) {
		$site_logo = get_option( 'site_logo', null );
		$ftc_logo  = $this->getData()->get( 'logo' );

		if ( $site_logo === $ftc_logo ) {
			return;
		}

		update_option( 'site_logo', $ftc_logo );
	}
}
