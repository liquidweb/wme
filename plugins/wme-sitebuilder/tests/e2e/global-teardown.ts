const { chromium } = require('@playwright/test');
const { admin } = require('./test-data/data');

module.exports = async (config) => {
	const { baseURL, userAgent } = config.projects[0].use;

	// Specify user agent when running against an external test site to avoid getting HTTP 406 NOT ACCEPTABLE errors.
	const contextOptions = { baseURL, userAgent };

	const browser = await chromium.launch();
	const context = await browser.newContext(contextOptions);
	const adminPage = await context.newPage();

	await adminPage.goto(`/wp-admin`);
};
