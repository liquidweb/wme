import { __ } from '@wordpress/i18n';

export const SITEBUILDER = window.sitebuilder;

export const ASSETS_URL = SITEBUILDER.assets_url;

export const CARDS: SetupCardInterface[] = SITEBUILDER.cards || [];

export const WIZARDS = SITEBUILDER.wizards || {};

export const IMAGE_DIR = `${ ASSETS_URL }img/sitebuilderapp/`;

export const SITEBUILDER_URL = SITEBUILDER.sitebuilder_url;

export const AJAX_URL = SITEBUILDER.site_url + '/wp-admin/admin-ajax.php';

export const FTC_PROPS = SITEBUILDER.wizards.ftc;

export const STORE_SETUP_PROPS = SITEBUILDER.wizards.store_setup;

export const LOOK_AND_FEEL_PROPS = SITEBUILDER.wizards.look_and_feel;

export const GO_LIVE_PROPS = SITEBUILDER.wizards.golive;

export const NEXCESS_SUPPORT_URL = SITEBUILDER.support_url;

export const NEXCESS_DOMAIN_REGISTRATION_URL = GO_LIVE_PROPS.domainRegistrationUrl;

export const NEXCESS_DOMAIN_SEARCH_URL = GO_LIVE_PROPS.domainSearchUrl;

export const WP_101_URL = 'https://app.wp101plugin.com/api/media/';

export const WP_101_API_KEY = 'testkey';

export const WP_101_HOW_TO_LINKS = [{
	title: __('Simple', 'nexcess-mapps'),
	modalTitle: __('Simple Product Overview', 'nexcess-mapps'),
	url: 'wp101:woocommerce-simple-product',
	target: '_blank',
},
{
	title: __('Variable', 'nexcess-mapps'),
	modalTitle: __('Variable Product Overview', 'nexcess-mapps'),
	url: 'wp101:woocommerce-variable-products',
	target: '_blank',
},
{
	title: __('Grouped', 'nexcess-mapps'),
	modalTitle: __('Grouped Product Overview', 'nexcess-mapps'),
	url: 'wp101:woocommerce-grouped-product',
	target: '_blank',
},
{
	title: __('Downloadable', 'nexcess-mapps'),
	modalTitle: __('Downloadable Product Overview', 'nexcess-mapps'),
	url: 'wp101:woocommerce-downloadable-products',
	target: '_blank',
}];

export * from './theme';
