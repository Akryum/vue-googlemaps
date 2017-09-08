import MapElement from '../mixins/MapElement'

const boundProps = [
	'center',
	'draggable',
	'editable',
	'radius',
	'visible',
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
	name: 'GoogleMapsCircle',

	mixins: [
		MapElement,
	],

	props: {
		center: {
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
		radius: {
			type: Number,
			required: true,
		},
		visible: {
			default: true,
		},
		zIndex: {
			type: Number,
		},
	},

	watch: {
		clickable: 'updateOptions',
		zIndex: 'updateOptions',
	},

	methods: {
		updateOptions (options) {
			this.$circle && this.$circle.setOptions(options || this.$props)
		},
	},

	render (h) {
		return ''
	},

	googleMapsReady () {
		const options = this.$props
		options.map = this.$map
		this.$circle = new window.google.maps.Circle(options)
		this.bindProps(this.$circle, boundProps)
		this.redirectEvents(this.$circle, redirectedEvents)
	},

	beforeDestroy () {
		if (this.$circle) {
			this.$circle.setMap(null)
		}
	},
}
