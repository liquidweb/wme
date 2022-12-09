# Wordpress Made Easy monorepo

This guide allows you to make changes in the monorepo and have them reflected directly in the (wme-sitebuilder)[https://github.com/moderntribe/wme-sitebuilder] plugin.

### Get started

1. Add webpack to `packages/sitebuilder` and `packages/storebuilder`. If you have webpack installed globally you can possibly skip this step
2. Run `pnpm install`
3. Run `pnpm build`

- If you have built the project in the past and the build is failing now, remove all the `dist` folders and turbo cache files in each project.

### Linking for local dev

1. Build the project (see Get Started)
2. Install [yalc](https://github.com/wclr/yalc)
3. Run the `dev` script in the monorepo:
```
pnpm run dev
```
4. Go to your local Wordpress & wme-sitebuilder plugin and install the yalc package: `yalc add @moderntribe/sitebuilder` or `yalc add @moderntribe/storebuilder`
6. Start `watch` in the plugin: 
```
npm watch
```

After these steps, this is the expected pipeline:

- Make a change in the monorepo
- A new bundle will be generated in the monorepo
- Because a new bundle has been generated in the monorepo and it's linked using yalc, a new bundle will be generated in the plugin
- Reload the page
- See your change
