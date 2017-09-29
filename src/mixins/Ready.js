import loader from '../lib-loader'
import { handleError } from '../utils/error'

export default {
	data () {
		return {
			googleMapsReady: false,
		}
	},

	async mounted () {
		await loader.ensureReady()

		// Prepare
		{
			const handlers = this.$options.googleMapsPrepare
			if (handlers) {
				const promises = []
				for (let i = 0; i < handlers.length; i++) {
					try {
						const result = handlers[i].call(this)
						if (typeof result.then === 'function') {
							promises.push(result)
						}
					} catch (e) {
						handleError(e, this, `googleMapsPrepare hook`)
					}
				}
				await Promise.all(promises)
			}
		}

		// Ready
		this.googleMapsReady = true
		{
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
		}
		this.$emit('ready')
	},
}
