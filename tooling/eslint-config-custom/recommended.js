module.exports = {
	extends: [
		require.resolve("./custom.js"),
		"plugin:prettier/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	rules: {
		"prettier/prettier": ["error"],
	},
	settings: {
		"import/resolver": "typescript",
	},
	ignorePatterns: ["**/*.d.ts"],
	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx"],
			parser: "@typescript-eslint/parser",
			rules: {
				"no-duplicate-imports": "off",
				"@typescript-eslint/no-duplicate-imports": "error",
				// Don't require redundant JSDoc types in TypeScript files.
				"jsdoc/require-param-type": "off",
				"jsdoc/require-returns-type": "off",
				// Handled by TS itself.
				"no-unused-vars": "off",
				// no-shadow doesn't work correctly in TS, so let's use a TS-dedicated version instead.
				"no-shadow": "off",
				"@typescript-eslint/no-shadow": "error",
			},
		},
	],
};
