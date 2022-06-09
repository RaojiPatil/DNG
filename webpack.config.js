const defaultConfig = require('@wordpress/scripts/config/webpack.config');
defaultConfig.output.path = __dirname + '/dist/build';

module.exports = {
	...defaultConfig,
	entry: {
		admin: './src/admin.js', // 'name' : 'path/file.ext'.
		//'plugin': './src/plugin.js', // 'name' : 'path/file.ext'.
	},
};
