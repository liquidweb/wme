# E2E Test Utils

This is a pared-down version of [Gutenberg's End-To-End (E2E) Playwright test utils]((https://github.com/WordPress/gutenberg/tree/trunk/packages/e2e-test-utils-playwright)) which retains features specific for working within the admin.

If those utilities are ever published, it would be beneficial to switch any dependencies of this project to use that one instead.

_It works properly with the minimum version of WordPress `5.6.0`._

## Installation

Install the module

```bash
npm install @moderntribe/e2e-test-utils --save-dev
```

**Note**: This package requires Node.js 12.0.0 or later. It is not compatible with older versions.

## API

### test

The extended Playwright's [test](https://playwright.dev/docs/api/class-test) module with the `admin`, `editor`, `pageUtils` and the `requestUtils` fixtures.

### expect

The Playwright/Jest's [expect](https://jestjs.io/docs/expect) function.

### Admin

End-to-end test utilities for WordPress admin's user interface.

```js
const admin = new Admin( { page, pageUtils } );
await admin.visitAdminPage( 'options-general.php' );
```

### Editor

End to end test utilities for the WordPress Block Editor.

To use these utilities, instantiate them within each test file:
```js
test.use( {
	editor: async ( { page }, use ) => {
		await use( new Editor( { page, hasIframe: true } ) );
	},
} );
```

The `hasIframe` property denotes whether the editor canvas uses an Iframe, as the site editor currently does. Omit this for non-iframe editors.

Within a test or test utility, use the `canvas` property to select elements within the iframe canvas:

```js
await editor.canvas.locator( 'role=document[name="Paragraph block"i]' )
```

### PageUtils

Generic Playwright utilities for interacting with web pages.

```js
const pageUtils = new PageUtils( { page } );
await pageUtils.pressKeyWithModifier( 'primary', 'a' );
```

### RequestUtils

Playwright utilities for interacting with the WordPress REST API.

Create a request utils instance.

```js
const requestUtils = await RequestUtils.setup( {
	user: {
		username: 'admin',
		password: 'password',
	},
} );
```
