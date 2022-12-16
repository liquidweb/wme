export const SITE_DETAILS = window.site_details;

export const ASSETS_URL = SITE_DETAILS.assets_url;

export const IMAGE_DIR = `${ ASSETS_URL }images/`;

export const CARDS: SetupCardAccordionInterface[] = SITE_DETAILS.cards || [];
