module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'airbnb-base',
		'plugin:nuxt/recommended',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	plugins: ['vue', 'import'],
	rules: {
		'object-curly-spacing': ['error', 'always'],
		// Включаем правила для сортировки импортов
		'import/order': [
			'error',
			{
				groups: [
					['builtin', 'external'],
					['internal'],
					['parent', 'sibling', 'index'],
				],
				'newlines-between': 'always',
			},
		],

		// Разрешаем использование абсолютных импортов
		'import/no-unresolved': 'off',
		'import/extensions': [
			'error',
			'always',
			{
				js: 'never',
				vue: 'never',
			},
		],

		// Разрешаем использовать console только в dev-режиме
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		// Поддержка алиасов (если используете их в Nuxt)
		'import/resolver': {
			alias: {
				map: [
					['@', './'],
					['~', './'],
				],
				extensions: ['.js', '.vue', '.json'],
			},
		},

		// Отключаем правило для пробела после `function` (для совместимости с Vue)
		'space-before-function-paren': ['error', 'never'],
	},
	overrides: [
		{
			files: ['**/*.vue'],
			rules: {
				'vue/script-setup-uses-vars': 'error',
			},
		},
	],
};
