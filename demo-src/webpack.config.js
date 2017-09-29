var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, '../docs'),
		publicPath: '/',
		filename: 'build.js',
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
					},
					// other vue-loader options go here
				},
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]',
				},
			},
		],
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
	},
	performance: {
		hints: false,
	},
	devtool: '#eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
			},
		}),
	],
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false,
			},
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
	])
}
