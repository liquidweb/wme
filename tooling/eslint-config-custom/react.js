module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"airbnb",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	settings: {
		"import/resolver": {
			typescript: {},
		},
		react: {
			version: "detect",
		},
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"import/extensions": [
			"error",
			"ignorePackages",
			{ ts: "never", tsx: "never" },
		],
		"no-unused-vars": 0,
		"react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: true,
			},
		],
		"import/prefer-default-export": "off",
		"react/function-component-definition": "off",
		"no-restricted-exports": "off",
		"react/require-default-props": "off",
		"react/jsx-props-no-spreading": 0,
		"react/no-unstable-nested-components": [
			"error",
			{
				allowAsProps: true,
			},
		],
		"no-tabs": "warn",
		"no-trailing-spaces": "warn",
		"import/no-useless-path-segments": "warn",
		indent: "warn",
		"no-mixed-spaces-and-tabs": "warn",
		"comma-dangle": "warn",
		"arrow-body-style": "warn",
		"react/react-in-jsx-scope": "warn",
		quotes: "warn",
	},
};
