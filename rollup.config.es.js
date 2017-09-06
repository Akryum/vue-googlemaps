import base from './rollup.config.base'

const config = Object.assign({}, base, {
	output: {
		file: 'dist/vue-googlemaps.esm.js',
		format: 'es',
	},
})

export default config
