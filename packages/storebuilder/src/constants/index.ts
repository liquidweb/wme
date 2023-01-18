import { __ } from '@wordpress/i18n';

export const STOREBUILDER = window.sitebuilder_store_details;

export const ASSETS_URL = STOREBUILDER.assets_url;

export const IMAGE_DIR = `${ ASSETS_URL }images/`;

export const CARDS: SetupCardInterface[] = STOREBUILDER.cards || [];

export const WIZARDS = STOREBUILDER.wizards || {};

export const STOREBUILDER_URL = STOREBUILDER?.page_url || '';

export const AJAX_URL = STOREBUILDER.site_url + '/wp-admin/admin-ajax.php';

export const STORE_SETUP_PROPS = STOREBUILDER.wizards.store_setup;

export const NEXCESS_SUPPORT_URL = STOREBUILDER.support_url;

export const SHIPPING_PROPS = WIZARDS?.shipping || {};

export const USPS_PLUGIN_SLUG = 'elex-usps-shipping-method';

export const WP_101_URL = 'https://app.wp101plugin.com/api/media/';

export const WP_101_API_KEY = STOREBUILDER?.wp101_api_key || '';

export const PAYMENTS_PAYPAL_PROPS = STOREBUILDER.wizards.payment_gateway_paypal;

export const PAYMENTS_STRIPE_PROPS = STOREBUILDER.wizards.payment_gateway_stripe;

export const PAYPAL_PLUGIN_SLUG = 'woocommerce-paypal-payments';

export const STRIPE_PLUGIN_SLUG = 'woocommerce-gateway-stripe';

export const WP_101_HOW_TO_LINKS = [{
	title: __('Simple', 'moderntribe-storebuilder'),
	modalTitle: __('Simple Product Overview', 'moderntribe-storebuilder'),
	url: 'wp101:woocommerce-simple-product',
	target: '_blank',
},
{
	title: __('Variable', 'moderntribe-storebuilder'),
	modalTitle: __('Variable Product Overview', 'moderntribe-storebuilder'),
	url: 'wp101:woocommerce-variable-products',
	target: '_blank',
},
{
	title: __('Grouped', 'moderntribe-storebuilder'),
	modalTitle: __('Grouped Product Overview', 'moderntribe-storebuilder'),
	url: 'wp101:woocommerce-grouped-product',
	target: '_blank',
},
{
	title: __('Downloadable', 'moderntribe-storebuilder'),
	modalTitle: __('Downloadable Product Overview', 'moderntribe-storebuilder'),
	url: 'wp101:woocommerce-downloadable-products',
	target: '_blank',
}];

export * from './theme';
