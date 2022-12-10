# Wordpress Made Easy: Sitebuilder

Pre-requisites: Install [yalc](https://github.com/wclr/yalc)

## Getting started with local development
*IMPORTANT:* First follow the "get started" section of the [monorepo](https://github.com/moderntribe/wme#readme).

### Update webpack watch options
In order to prevent webpack from ignoring changes to our `@moderntribe` 
packages, we need to tell webpack to _not_ ignore them:
```
// webpack.mix.js

mix.webpackConfig({
	// ...
	watchOptions: {
		ignored: ['node_modules/*/!(@moderntribe/*)/**/'],
	},
});
```

### Install and add monorpo packages
1. Run `npm install`
2. Use yalc to add monorepo packages
```
yalc add @moderntribe/sitebuilder
yalc add @moderntribe/storebuilder
yalc add @moderntribe/wme-ui
```

### Watch project
```
npm run watch
```

