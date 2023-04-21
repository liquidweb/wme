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
			'navTitle'  => __( 'Take It Further', 'wme-sitebuilder' ),
			'title'     => __( 'Take It Further', 'wme-sitebuilder' ),
			'intro'     => __( 'Explore advanced features and customization options curated just for your goals.', 'wme-sitebuilder' ),
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
//			'taskCta' => __( 'Get Started', 'wme-sitebuilder' ),
			'title'   => __( 'Configure Your Store', 'wme-sitebuilder' ),
			'intro'   => __( 'We\'ll walk you through setting up your store,', 'wme-sitebuilder' ),
			'url'     => admin_url( 'admin.php?page=sitebuilder-store-details' ),
		];

		return $rows;
	}

}
