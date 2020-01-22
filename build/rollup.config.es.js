import base from './rollup.config.base'

const config = Object.assign({}, base, {
	output: {
		name: 'vue-googlemaps', // TODO: move to base
		file: 'dist/vue-googlemaps.esm.js',
		format: 'es',
	},
})

export default config
