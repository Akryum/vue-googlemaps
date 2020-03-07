import base from './rollup.config.base'
import { terser } from 'rollup-plugin-terser'
import { minify } from 'terser'

const config = Object.assign({}, base, {
	output: {
		name: 'VueGoogleMaps',
		exports: 'named', // TODO: move to base
		file: 'dist/vue-googlemaps.min.js',
		format: 'iife',
	},
})

config.plugins.push(terser({}, minify))

export default config
