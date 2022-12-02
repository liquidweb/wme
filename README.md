## Development with the plugin
*This is a very early version of the document. Please edit and improve it if you can.*

This guide allows you to make changes in the monorepo and have them reflected directly in the plugin. The plugin is in a different repository.

Pre-requisites: Install [yalc](https://github.com/wclr/yalc)

### Steps in the plugin

1. Prevent ignoring the `@moderntribe` packages when running the watch mode:

```js
// webpack.mix.js

mix.webpackConfig({
	// ...
	watchOptions: {
		ignored: ['node_modules/*/!(@moderntribe/*)/**/'],
	},
});
```

2. Add, using yalc, all the packages that you want to see updated in the plugin:
```sh
yalc add @moderntribe/sitebuilder
yalc add @moderntribe/storebuilder
yalc add @moderntribe/wme-ui
```

3. Run the watch script in the plugin:
```sh
npm run watch
```

### Steps in the monorepo
1. Run the `dev` script in the monorepo:
```sh
pnpm run dev
```


After these steps, this is the expected pipeline:
- Make a change in the monorepo
- A new bundle will be generated in the monorepo
- Because a new bundle has been generated in the monorepo and it's linked using yalc, a new bundle will be generated in the plugin
- Reload the page
- See your change