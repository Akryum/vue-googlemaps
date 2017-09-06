var merge = require('webpack-merge')
var base = require('./webpack.base.config')

module.exports = merge(base, {
	devtool: '#inline-source-map',
	cache: false,
})
