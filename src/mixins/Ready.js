import loader from '../lib-loader'
import { handleError } from '../utils/error'

export default {
	async mounted () {
		await loader.ensureReady()
		const handlers = this.$options.googleMapsReady
		if (handlers) {
			for (let i = 0; i < handlers.length; i++) {
				try {
					handlers[i].call(this)
				} catch (e) {
					handleError(e, this, `googleMapsReady hook`)
				}
			}
		}
	},
}
