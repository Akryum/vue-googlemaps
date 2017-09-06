import BoundProps from './BoundProps'
import Events from './Events'
import Ready from './Ready'
import FindAncestor from './FindAncestor'

export default {
	mixins: [
		BoundProps,
		Events,
		FindAncestor,
		Ready,
	],

	created () {
		const mapAncestor = this.$findAncestor(
			a => a.$options.name === 'GoogleMapsMap'
		)

		if (!mapAncestor) {
			throw new Error(`${this.constructor.name} component must be used within a <google-map> component.`)
		}

		this.$mapAncestor = mapAncestor
	},

	googleMapsReady () {
		this.$map = this.$mapAncestor.$map
	},
}
