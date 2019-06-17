import MapElement from '../mixins/MapElement'

const boundProps = [
	'draggable',
	'editable',
	'options',
	'paths',
]

const redirectedEvents = [
	'click',
	'rightclick',
	'dblclick',
	'drag',
	'dragstart',
	'dragend',
	'mouseup',
	'mousedown',
	'mouseover',
	'mouseout',
]

export default {
	name: 'GoogleMapsPolygon',

	mixins: [
		MapElement,
	],

	props: {
		draggable: {
			type: Boolean,
			default: false,
		},
		options: {
			type: Object,
			default: () => ({}),
		},
		suppressMarkers: {
			type: Boolean,
			default: false,
		},
		directionResult: {
			type: Object,
			required: true,
		},
	},

	watch: {
		paths: 'updateOptions',
		options: 'updateOptions',
	},

	methods: {
		updateOptions (options) {
			this.$_direction && this.$_direction.setOptions(options || this.$props)
		},
	},

	render (h) {
		return ''
	},

	googleMapsReady () {
		const options = Object.assign({}, this.$props)
		options.map = this.$_map

		this.$_direction = new window.google.maps.DirectionsRenderer(options).setDirections(this.directionResult)
	},

	beforeDestroy () {
		if (this.$_direction) {
			this.$_direction.setMap(null)
		}
	},
}
