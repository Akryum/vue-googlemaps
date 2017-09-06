import { loader } from '../lib-loader'

export default {
	async mounted () {
		await loader.ensureReady()
		this.ready()
	},

	methods: {
		ready () {
			// Override this in the component
		},
	},
}
