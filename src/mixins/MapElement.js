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
		const mapAncestor = this.$_findAncestor(
			a => a.$options.name === 'GoogleMapsMap'
		)

		if (!mapAncestor) {
			throw new Error(`${this.constructor.name} component must be used within a <google-map> component.`)
		}

		this.$_mapAncestor = mapAncestor
	},

	async googleMapsPrepare () {
		const mapComp = this.$_mapAncestor
		this.$_map = await mapComp.$_getMap()
	},
}
