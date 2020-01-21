import MapElement from '../mixins/MapElement'

const boundProps = [

]

const redirectedEvents = [

]

export default {
	name: 'GoogleMapsDirectionsRenderer',

	mixins: [
		MapElement,
	],

	props: {
		options: {
			type: Object,
			default: () => ({}),
		}
	},

	watch: {
		options: 'updateOptions',
	},

	methods: {
		updateOptions (options) {
			this.$_directionsRenderer && this.$_directionsRenderer.setOptions(options || this.$props)
		},
	},

	render (h) {
		return ''
	},

	googleMapsReady () {
		const options = Object.assign({}, this.$props)
		options.map = this.$_map
        console.log(options);
		this.$_directionsRenderer = new window.google.maps.DirectionsRenderer(options)
		this.bindProps(this.$_polyline, boundProps)
		this.redirectEvents(this.$_polyline, redirectedEvents)
	},

	beforeDestroy () {
		if (this.$_directionsRenderer) {
			this.$_directionsRenderer.setMap(null)
		}
	},
}
