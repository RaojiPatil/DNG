module.exports = {
	extends: ['plugin:@wordpress/eslint-plugin/recommended'],
	ignorePatterns: ['deprecated.js'],
	globals: {
		SIWGOTData: true,
		jQuery: true,
	},
};
