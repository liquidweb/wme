<?php

namespace Tribe\WME\Sitebuilder\Cards;

use Tribe\WME\Sitebuilder\Concerns\HasWordPressDependencies;

class Goals extends Card {

	use HasWordPressDependencies;

	/**
	 * @var string
	 */
	protected $admin_page_slug = 'sitebuilder';

	/**
	 * @var string
	 */
	protected $card_slug = 'goals';

	/**
	 * Register hook callbacks.
	 */
	public function register_hooks() {
		parent::register_hooks();

		add_filter( 'wme_sitebuilder_goals_rows', [ $this, 'maybe_add_store_builder_task' ] );
	}

	/**
	 * Get properties.
	 *
	 * @return array
	 */
	public function props() {
		return [
			'id'        => 'goals',
			'navTitle'  => __( 'Your Goals', 'wme-sitebuilder' ),
			'title'     => __( 'Your Goals', 'wme-sitebuilder' ),
			'intro'     => __( 'Get started on your goals by completing a few tasks.', 'wme-sitebuilder' ),
			'completed' => false,
			'rows'      => apply_filters( 'wme_sitebuilder_goals_rows', [] )
		];
	}

	/**
	 * Add rows.
	 * @todo this should be based on the user's goals set in the FTC wizard.
	 *
	 * @param array $rows
	 *
	 * @return array
	 */
	public function maybe_add_store_builder_task( $rows ) {
		if ( ! $this->isPluginInstalled( 'woocommerce/woocommerce.php' ) ) {
			return $rows;
		}

		$rows[] = [
			'id'      => 'goals-woocommerce',
			'type'    => 'task',
			'taskCta' => __( 'Get Started', 'wme-sitebuilder' ),
			'title'   => __( 'Set up your store', 'wme-sitebuilder' ),
			'intro'   => __( 'Set up your store.', 'wme-sitebuilder' ),
			'url'     => admin_url( 'admin.php?page=sitebuilder-store-details' ),
		];

		return $rows;
	}

}
