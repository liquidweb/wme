export const SITE_SETTINGS = window?.site_settings;

export const ASSETS_URL = SITE_SETTINGS?.assets_url;

export const IMAGE_DIR = `${ ASSETS_URL }images/`;

export const CARDS: SetupCardAccordionInterface[] = SITE_SETTINGS?.cards || [];
