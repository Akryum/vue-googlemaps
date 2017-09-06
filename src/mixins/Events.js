export default {
	methods: {
		listen (target, event, handler) {
			this._googleListeners.push(target.addListener(event, handler))
		},

		redirectEvents (target, events) {
			for (const e of events) {
				this.listen(target, e, (...args) => {
					this.$emit(e, ...args)
				})
			}
		},
	},

	beforeCreate () {
		this._googleListeners = []
	},

	beforeDestroy () {
		for (const listener of this._googleListeners) {
			listener.remove()
		}
	},
}
