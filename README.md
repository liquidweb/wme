# Wordpress Made Easy: Monorepo

This guide allows you to make changes in the monorepo and have them 
reflected directly in the [wme-sitebuilder](https://github.com/moderntribe/wme-sitebuilder) plugin.

## Prerequisites
- Install [yalc](https://github.com/wclr/yalc)
- Install pnpm using [their documentation](https://pnpm.io/installation) or [homebrew](https://formulae.brew.sh/formula/pnpm#default)

## Get started with local development
Create "watched" development builds and make them available as 
packages through yalc. 

1. Run `pnpm install`
2. Run `pnpm dev`

**Note:** If you've built the project in the past and the build is now failing, 
run `pnpm clean:hard` , then retry the "get started" steps.

## Using monorepo packages for local development
After the `dev` build has successfully completed, yalc should will have 
published the following packages for use in other local projects:
```
@moderntribe/sitebuilder
@moderntribe/storebuilder
@moderntribe/wme-ui
```

You can now use these packages by running `yalc add [package]` in the 
desired project.

See the [WME Sitebuilder documentation](https://github.com/moderntribe/wme-sitebuilder#readme) for more explicit directions.

## After these steps, this is the expected pipeline:
- Make a change in the monorepo
- A new bundle will be generated in the monorepo
- Because a new bundle has been generated in the monorepo and it's linked 
using yalc, a new bundle will be generated in the plugin
- Reload the page
- See your change
