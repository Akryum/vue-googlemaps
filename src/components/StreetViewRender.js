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
		streetViewResult: {
			type: Object,
			required: true,
		},
	},

	watch: {
		paths: 'updateOptions',
		options: 'updateOptions',
		streetViewResult: {
			handler (value) {
				value && this.rerender()
			},
			deep: true,
		},
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

		// draw directions
		this.$_direction_render = new window.google.maps.StreetViewPanorama(options)
		this.$_direction = this.$_direction_render.setDirections(this.streetViewResult)
	},

	beforeDestroy () {
		if (this.$_direction) {
			this.$_direction.setMap(null)
		}
		if (this.$_direction_render) {
			this.$_direction_render.setMap(null)
		}
		if (this.$_infoWindow) {
			this.$_infoWindow.setMap(null)
		}
	},
}
