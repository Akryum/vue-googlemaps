import MapElement from '../mixins/MapElement'

const boundProps = [
	'draggable',
	'editable',
	'options',
	'path',
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
	name: 'GoogleMapsPolyline',

	mixins: [
		MapElement,
	],

	props: {
		editable: {
			type: Boolean,
			default: false,
		},
		draggable: {
			type: Boolean,
			default: false,
		},
		options: {
			type: Object,
		},
		path: {
			type: Array,
		},
	},

	render (h) {
		return ''
	},

	googleMapsReady () {
		const options = Object.assign({}, this.$props)
		options.map = this.$_map

		this.$_polyline = new window.google.maps.Polyline(options)
		this.bindProps(this.$_polyline, boundProps)
		this.redirectEvents(this.$_polyline, redirectedEvents)
	},

	beforeDestroy () {
		if (this.$_polyline) {
			this.$_polyline.setMap(null)
		}
	},
}
