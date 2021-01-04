module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		'no-tabs': ['off'],
		indent: ['warn', 'tab'],
		'no-plusplus': ['off'],
	},
};
