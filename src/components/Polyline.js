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
			default: () => ({}),
		},
		path: {
			type: Array,
		},
	},

	watch: {
		options: 'updateOptions',
	},

	methods: {
		updateOptions (options) {
			this.$_polyline && this.$_polyline.setOptions(options || this.$props)
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
		this.listen(this.$_polyline, 'drag', () => {
			this.$emit('path_changed', this.$_polyline.getPath())
		})
	},

	beforeDestroy () {
		if (this.$_polyline) {
			this.$_polyline.setMap(null)
		}
	},
}
