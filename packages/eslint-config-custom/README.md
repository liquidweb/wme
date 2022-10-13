# ESLint Custom Config

This is an [ESLint](https://eslint.org/) plugin including configurations and custom rules for WME development.

This primarily extends the [`@typescript/eslint-plugin/recommended`](https://github.com/typescript-eslint/typescript-eslint) and [`@wordpress/eslint-plugin/recommended`](https://github.com/WordPress/gutenberg/tree/master/packages/eslint-plugin) rulesets.

In addition, this ruleset does implement a number of custom rules:

- Using typescript eslint parser to allow for eslint Import ([see issue](https://github.com/gajus/eslint-plugin-jsdoc/issues/604#issuecomment-653962767))
- prettier formatting
- No yoda conditionals
- Radix argument required for `parseInt`.

## Installation

Install the module

```
pnpm install @moderntribe/eslint-config-custom --save-dev
```

## Usage

To opt-in to the default configuration, extend your own project's `.eslintrc.js` file:

```js
module.exports = {
  extends: ["plugin:@moderntribe/eslint-config-custom/recommended"],
};
```

Refer to the [ESLint documentation on Shareable Configs](http://eslint.org/docs/developer-guide/shareable-configs) for more information.

The `recommended` preset will include rules governing an ES2015+ environment, and includes rules from [``](https://github.com/prettier/eslint-plugin-prettier), [`@wordpress/eslint-plugin/recommended`](https://github.com/WordPress/gutenberg/tree/master/packages/eslint-plugin) project.

### Rules

| Rule                                                                  | Description      | Recommended |
| --------------------------------------------------------------------- | ---------------- | ----------- |
| [custom-tbd](/packages/eslint-config-custom/docs/rules/custom-tbd.md) | TBD Custom Rules | ✓           |
