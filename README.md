## Development with the plugin
*This is a very early version of the document. Please edit and improve it if you can.*

This guide is focused on sitebuilder development. It allows you to make changes in the monorepo and have them reflected directly in the plugin. The plugin is another repository.

Pre-requisites: Install [yalc](https://github.com/wclr/yalc)

First, execute the watch command. We're excluding the storebuilder for now.
```
npm run watch --  --filter=\!@moderntribe/storebuilder
```

This will generate a new bundle with each new code change, and push the changes to yalc.

On the plugin project, use the `chore/webpack-sitebuilder` branch. After installing the packages using `pnpm`, re-add the `@moderntribe/sitebuilder` using yalc: `yalc add @moderntribe/sitebuilder`. Now, you can to run `npm run watch` in the plugin.

After these steps, this is the expected pipeline:
- Make a change in the sitebuilder (monorepo)
- A new bundle will be generated in the monorepo
- Because a new bundle has been generated in the monorepo and it's linked using yalc, a new bundle will be generated in the plugin
- Reload the page
- See your change