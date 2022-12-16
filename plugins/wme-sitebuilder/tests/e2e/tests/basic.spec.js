const { test, expect } = require( '@playwright/test' );

test.describe(
	'A basic set of tests to ensure WP and wp-admin load',
	() => {
		test( 'Load the home page', async ( { page } ) => {
			await page.goto( '/' );
			const title = page.locator( 'header .wp-block-site-title' );
			await expect( title ).toHaveText(
				'wme-sitebuilder'
			);
		} );

		test.describe( 'Sign in as admin', () => {
			test.use( {
				storageState: process.env.ADMINSTATE,
			} );
			test( 'Load wp-admin', async ( { page } ) => {
				await page.goto( '/wp-admin' );
				const title = page.locator( 'div#login h1' );
				await expect( title ).toHaveText( 'Powered by WordPress' );
			} );
		} );
	}
);
