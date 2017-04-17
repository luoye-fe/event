var path = require('path');

var complieTools = require('rollup-plugin-typescript');
var eslint = require('rollup-plugin-eslint');

var env = require('./env.js');

var config = {
	entry: path.join(__dirname, '../src/index.ts'),
	plugins: [
		eslint(),
		complieTools()
	]
};

if (env === 'dev') {
	module.exports = Object.assign({
		format: 'umd',
		moduleName: 'Event',
		dest: path.join(__dirname, '../dist/event.js')
	}, config);
} else {
	module.exports = config;
}
