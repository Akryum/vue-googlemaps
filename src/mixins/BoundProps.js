import { bindProp } from '../utils/bind-prop'

export default {
	beforeDestroy () {
		this.unbindProps()
	},

	methods: {
		bindProps (target, props) {
			this.unbindProps()
			this.$_boundsProps = []
			for (const prop of props) {
				let options = {
					vm: this,
					target: target,
				}
				if (typeof prop === 'string') {
					options.name = prop
				} else {
					Object.assign(options, prop)
				}
				this.$_boundsProps.push(bindProp(options))
			}
		},

		unbindProps () {
			if (this.$_boundsProps) {
				this.$_boundsProps.forEach(unbind => unbind())
			}
		},
	},
}
