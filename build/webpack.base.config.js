var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var outputFile = 'vue-googlemaps'
var globalName = 'VueGoogleMaps'

var config = require('../package.json')

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: outputFile + '.umd.js',
		libraryTarget: 'umd',
	},
	resolve: {
		symlinks: false,
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
			},
			{
				test: /.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextPlugin.extract('css-loader'),
						stylus: ExtractTextPlugin.extract('css-loader!stylus-loader'),
					},
				},
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css-loader'),
			},
		],
	},
	externals: {
		// Put external libraries like lodash here
	},
	plugins: [
		new webpack.DefinePlugin({
			'VERSION': JSON.stringify(config.version),
		}),
		new ExtractTextPlugin(outputFile + '.css'),
	],
}
