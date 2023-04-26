export const SITEBUILDER = window.sitebuilder;

export const ASSETS_URL = SITEBUILDER.assets_url;

export const IMAGE_DIR = `${ ASSETS_URL }images/`;

export const LOGO = SITEBUILDER.logo;

export const CARDS: SetupCardInterface[] = SITEBUILDER.cards || [];

export const WIZARDS = SITEBUILDER.wizards || {};

export const SITEBUILDER_URL = SITEBUILDER.page_url;

export const AJAX_URL = SITEBUILDER.site_url + '/wp-admin/admin-ajax.php';

export const FTC_PROPS = SITEBUILDER.wizards.ftc;

export const LOOK_AND_FEEL_PROPS = SITEBUILDER.wizards.look_and_feel;

export const GO_LIVE_PROPS = SITEBUILDER.wizards.golive;

export const NEXCESS_SUPPORT_URL = SITEBUILDER.support_url;

export * from './theme';
