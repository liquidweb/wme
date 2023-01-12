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
	externals: {
		'@wordpress/element': 'wp.element',
		'@wordpress/components': 'wp.components',
		'@wordpress/hooks': 'wp.hooks',
		'@wordpress/i18n': 'wp.i18n',
		underscore: '_',
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	resolve: {
		alias: {
			'@sb': __dirname + '/assets/js/store-details',
		}
	},
});

// Enable BrowserSync.
if (process.env.MIX_PROXY_URL) {
	mix.browserSync({
		proxy: process.env.MIX_PROXY_URL,
		files: [`${ __dirname }/**/*.js`, `${ __dirname }/dist/**/*.*`],
	});
}

// Bundle JavaScript.
mix.js('assets/js/sitebuilder.js', '/')
	.js('assets/js/store-details.js', '/')
	.sourceMaps(false)
	.eslint()
	.react();

mix.copyDirectory('../../packages/sitebuilder/dist/assets/', `${public_path}/sitebuilder/`);
mix.copyDirectory('../../packages/storebuilder/dist/assets/', `${public_path}/store-details/`);
