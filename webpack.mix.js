/* global Mix */
const mix = require('laravel-mix');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
require('laravel-mix-eslint');

const banner = 'This file is part of WME Sitebuilder and was generated automatically';
const public_path = process.env.MIX_BUILD_DIR || 'wme-sitebuilder/assets';

/*
 * Prevent Mix from creating a mix-manifest.json file, as we don't need it.
 *
 * @link https://github.com/JeffreyWay/laravel-mix/issues/580#issuecomment-457561221
 */
Mix.manifest.refresh = () => void 0;

// Customize Mix options.
mix.setPublicPath(public_path)
	.options({
		terser: {
			extractComments: false,
			terserOptions: {
				format: {
					comments: false,
					preamble: `/** ${ banner } */`,
				},
			},
		},
	});

// Customize the Webpack configuration.
mix.webpackConfig({
	plugins: [
		new webpack.BannerPlugin(banner),
	],
	resolve: {
		alias: {
			'@sb': __dirname + '/assets/js/storebuilder-app',
		}
	}
});

// Enable BrowserSync.
if (process.env.MIX_PROXY_URL) {
	mix.browserSync({
		proxy: process.env.MIX_PROXY_URL,
		files: [`${ __dirname }/**/*.js`, `${ __dirname }/dist/**/*.*`],
	});
}

// Bundle CSS.
mix.css('assets/css/storebuilder-scheme-v3.css', '/')
	.sourceMaps(false);
mix.sass('assets/scss/storebuilder-app.scss', '/');

// Bundle JavaScript.
mix.js('assets/js/sitebuilder-app.js', '/')
	.js('assets/js/storebuilder-app.js', '/')
	.sourceMaps(false)
	.eslint()
	.react();



mix.copyDirectory('node_modules/@moderntribe/sitebuilder/dist/assets/', `${ public_path }/sitebuilder/`)
mix.copyDirectory('node_modules/@moderntribe/storebuilder/dist/assets/', `${ public_path }/store-details/`)
