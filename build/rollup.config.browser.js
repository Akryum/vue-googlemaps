import base from './rollup.config.base'
import { terser } from 'rollup-plugin-terser'
import { minify } from 'terser'

const config = Object.assign({}, base, {
	exports: 'named',
	output: {
		file: 'dist/vue-googlemaps.min.js',
		format: 'iife',
	},
	name: 'VueGoogleMaps',
})

config.plugins.push(terser({}, minify))

export default config
