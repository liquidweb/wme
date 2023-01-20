/**
 * External dependencies
 */
import type { Browser, Page, BrowserContext } from '@playwright/test';

/**
 * Internal dependencies
 */
import { getPageError } from './get-page-error';
import { visitAdminPage } from './visit-admin-page';
import type { PageUtils } from '../page-utils';

type AdminConstructorProps = {
	page: Page;
	pageUtils: PageUtils;
};

export class Admin {
	browser: Browser;
	page: Page;
	pageUtils: PageUtils;
	context: BrowserContext;

	constructor( { page, pageUtils }: AdminConstructorProps ) {
		this.page = page;
		this.context = page.context();
		this.browser = this.context.browser()!;
		this.pageUtils = pageUtils;
	}

	getPageError = getPageError.bind( this );
	visitAdminPage = visitAdminPage.bind( this );
}
