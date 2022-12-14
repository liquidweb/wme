# Wordpress Made Easy: Sitebuilder

## Getting started with local development

**IMPORTANT:** First follow the "get started" section of the [monorepo](https://github.com/moderntribe/wme#readme).

### Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or a local docker installation)
* [pnpm](https://pnpm.io/)
* npx
  * `npx --version`
  * If not found, install with `npm install -g npx`

### Start the local environment

This plugin uses [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) for local development and testing.

1. After running `pnpm install` and `pnpm turbo build` from the base monorepo directory, you can start the local WordPress environment.
2. From the `plugins/sitebuider` folder, run `pnpm run env:dev` and wait for Docker to complete initializing the site.
3. Navigate your browser to `http://localhost:8888/wp-admin/`
   * Username: admin
   * Password: password

### Enable BrowserSync
1. Create a `.env` file in the root of the project
2. Add the following value according to your local setup, to the `.env` file:
```
MIX_PROXY_URL=sitebuilder-dev.local
```

### Watch project
```
pnpm run watch
```

### Testing

This plugin uses a combination of [Playwright](https://playwright.dev/) and [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)
to perform automated end-to-end testing in a browser. Before running the testing the first time, you'll need to install
the browsers playwright needs.

```
# To only install Chrome which is used by default
npx playwright install chromium

OR

# To install all browsers (Chrome, Firefox, Webkit)
npx playwright install
```

Start the local WordPress dev and testing environments

```
pnpm run env:dev
```

Run the test suite

```
pnpm run env:test
```
