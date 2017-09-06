export default {
	methods: {
		listen (target, event, handler) {
			this._thirdPartyEvents.push({
				target,
				event,
				handler,
			})
			target.addEventListener(event, handler)
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
		this._thirdPartyEvents = []
	},

	beforeDestroy () {
		for (const e of this._thirdPartyEvents) {
			e.target.removeEventListener(e.event, e.handler)
		}
	},
}
