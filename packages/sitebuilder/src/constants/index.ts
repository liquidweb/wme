export const SITEBUILDER = window.sitebuilder;

export const ASSETS_URL = SITEBUILDER.assetsUrl;

export const CARDS: SetupCardInterface[] = SITEBUILDER.cards || [];

export const WIZARDS = SITEBUILDER.wizards || {};

export const IMAGE_DIR = `${ ASSETS_URL }img/sitebuilderapp/`;

export const SITEBUILDER_URL = SITEBUILDER.sitebuilderUrl;

// TODO: update with actual support URL
export const NEXCESS_SUPPORT_URL = '';

// TODO: update with registraion URL
export const NEXCESS_DOMAIN_REGISTRATION_URL = '';

export * from './theme';
