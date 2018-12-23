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
		paths: {
			type: Array,
		},
	},

	watch: {
		paths: 'updateOptions',
		options: 'updateOptions',
	},

	methods: {
		updateOptions (options) {
			this.$_polygon && this.$_polygon.setOptions(options || this.$props)
		},
	},

	render (h) {
		return ''
	},

	googleMapsReady () {
		const options = Object.assign({}, this.$props)
		options.map = this.$_map

		this.$_polygon = new window.google.maps.Polygon(options)
		this.bindProps(this.$_polygon, boundProps)
		this.redirectEvents(this.$_polygon, redirectedEvents)
		this.listen(this.$_polygon, 'drag', () => {
			this.$emit('path_changed', this.$_polygon.getPath())
		})
	},

	beforeDestroy () {
		if (this.$_polygon) {
			this.$_polygon.setMap(null)
		}
	},
}
