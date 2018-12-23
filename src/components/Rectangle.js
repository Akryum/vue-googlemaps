import MapElement from '../mixins/MapElement'

const boundProps = [
	'bounds',
	'draggable',
	'editable',
	'visible',
	'options',
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
	name: 'GoogleMapsRectangle',

	mixins: [
		MapElement,
	],

	props: {
		bounds: {
			type: Object,
			required: true,
		},
		clickable: {
			type: Boolean,
			default: true,
		},
		draggable: {
			type: Boolean,
			default: false,
		},
		editable: {
			type: Boolean,
			default: false,
		},
		options: {
			type: Object,
			default: () => ({}),
		},
		visible: {
			default: true,
		},
		zIndex: {
			type: Number,
		},
	},

	watch: {
		bounds: 'updateBounds',
		options: 'updateOptions',
		clickable: 'updateOptions',
		zIndex: 'updateOptions',
	},

	methods: {
		updateOptions (options) {
			this.$_rectangle && this.$_rectangle.setOptions(options || this.$props)
		},

		updateBounds (bounds) {
			this.$_rectangle && this.$_rectangle.setBounds(bounds)
		},
	},

	render (h) {
		return ''
	},

	googleMapsReady () {
		const options = Object.assign({}, this.$props)
		options.map = this.$_map

		this.$_rectangle = new window.google.maps.Rectangle(options)
		this.bindProps(this.$_rectangle, boundProps)
		this.redirectEvents(this.$_rectangle, redirectedEvents)
	},

	beforeDestroy () {
		if (this.$_rectangle) {
			this.$_rectangle.setMap(null)
		}
	},
}
