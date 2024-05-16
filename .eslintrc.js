module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
	],
	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-control-regex': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'semi': [1, 'always'],
		'vue/no-unused-vars': 'off',
		'vue/valid-v-slot': ['error', {allowModifiers: true}],
		'vue/multi-word-component-names': 'off',
	},
};
