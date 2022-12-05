# Wordpress Made Easy monorepo

### Get started

1. Add webpack to `packages/sitebuilder` and `packages/storebuilder`. If you have webpack installed globally you can possibly skip this step
2. Run `pnpm install`
3. Run `pnpm build`

- If you have built the project in the past and the build is failing now, remove all the `dist` folders and turbo cache files in each project.

### Linking for local dev

1. Build the project (see Get Started)
2. Install [yalc](https://github.com/wclr/yalc)
3. In WME run `yalc publish --private`
4. Go to your local Wordpress & WME plugin and install the yalc package: `yalc add @moderntribe/sitebuilder` or `yalc add @moderntribe/storebuilder`
5. Make sure you have the WME plugin's dependencies installed: `pnpm install`
6. Build the plugin: `pnpm dev` or `pnpm prod` for a production build

#### After each change you will need to build both projects.

In the WME package:

1. `pnpm build`
2. `yalc push --private`
   OR
3. `pnpm local`

In the Wordpress plugin

1. `pnpm dev`
