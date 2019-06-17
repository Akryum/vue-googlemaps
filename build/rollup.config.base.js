import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import cjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import fs from 'fs'
import CleanCSS from 'clean-css'

const config = require('../package.json')

export default {
	input: 'src/index.js',
	name: 'vue-googlemaps',
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
        cjs({
            exclude: 'src/**',
        }),
		vue({
			css (style) {
				fs.writeFileSync('dist/vue-googlemaps.css', new CleanCSS().minify(style).styles)
			},
		}),
		babel({
			exclude: 'node_modules/**',
			'plugins': [
				'external-helpers',
			],
		}),
		replace({
			VERSION: JSON.stringify(config.version),
		}),
	],
	watch: {
		include: 'src/**',
	},
}
