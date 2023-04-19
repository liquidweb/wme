/* global Mix */
const mix = require('laravel-mix');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
require('laravel-mix-eslint');

const banner = 'This file is part of WME Sitebuilder and was generated automatically';
const publicPath = process.env.MIX_BUILD_DIR || 'wme-sitebuilder/assets';

/*
 * Prevent Mix from creating a mix-manifest.json file, as we don't need it.
 *
 * @link https://github.com/JeffreyWay/laravel-mix/issues/580#issuecomment-457561221
 */
Mix.manifest.refresh = () => void 0;

// Customize Mix options.
mix.setPublicPath(publicPath).options({
	terser: {
		extractComments: false,
		terserOptions: {
			format: {
				comments: false,
				preamble: `/** ${banner} */`,
			},
		},
	},
});

// Customize the Webpack configuration.
mix.webpackConfig({
	plugins: [new webpack.BannerPlugin(banner)],
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
		},
	},
});

// Bundle JavaScript.
mix.js('assets/js/sitebuilder.js', '/')
	.js('assets/js/store-details.js', '/')
	.js('assets/js/site-settings.js', '/')
	.sourceMaps(false)
	.eslint()
	.react();

// Enable BrowserSync.
if (process.env.MIX_PROXY_URL) {
	mix.browserSync({
		proxy: process.env.MIX_PROXY_URL,
		files: [`${__dirname}/**/*.js`, `${__dirname}/dist/**/*.*`],
		reloadDebounce: 2000,
	});
}

const copyAssets = (source, target) => {
	const sourceFolder = mix.inProduction() ? 'dist/assets/' : 'src/assets/images/';
	const targetFolder = mix.inProduction() ? '' : '/images/';
	mix.copyDirectory(
		`../../packages/${source}/${sourceFolder}`,
		`${publicPath}/${target}/${targetFolder}`,
	);
};

// Copy assets from packages.
copyAssets('sitebuilder', 'sitebuilder');
copyAssets('storebuilder', 'store-details');
copyAssets('site-settings', 'site-settings');
