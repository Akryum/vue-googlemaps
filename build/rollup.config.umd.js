import base from './rollup.config.base'

const config = Object.assign({}, base, {
	output: {
		name: 'vue-googlemaps', // TODO: move to base
		exports: 'named', // TODO: move to base
		file: 'dist/vue-googlemaps.umd.js',
		format: 'umd',
	},
})

export default config
