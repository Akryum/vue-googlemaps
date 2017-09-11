import MapElement from '../mixins/MapElement'

const boundProps = [
	'animation',
	'clickable',
	'cursor',
	'draggable',
	'icon',
	'label',
	'opacity',
	'place',
	'position',
	'shape',
	'title',
	'visible',
	'zIndex',
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
	name: 'GoogleMapsMarker',

	mixins: [
		MapElement,
	],

	props: {
		animation: {
			type: Number,
		},
		clickable: {
			type: Boolean,
			default: true,
		},
		cursor: {
			type: String,
		},
		draggable: {
			type: Boolean,
			default: false,
		},
		icon: {
		},
		label: {
		},
		opacity: {
			type: Number,
			default: 1,
		},
		place: {
			type: Object,
		},
		position: {
			type: Object,
		},
		shape: {
			type: Object,
		},
		title: {
			type: String,
		},
		visible: {
			default: true,
		},
		zIndex: {
			type: Number,
		},
	},

	render (h) {
		if (!this.$slots.default || this.$slots.default.length === 0) {
			return ''
		} else if (this.$slots.default.length === 1) {
			// So that infowindows can have a marker parent
			return this.$slots.default[0]
		} else {
			return h(
				'div',
				this.$slots.default
			)
		}
	},

	googleMapsReady () {
		const options = this.$props
		options.map = this.$map
		this.$marker = new window.google.maps.Marker(options)
		this.bindProps(this.$marker, boundProps)
		this.redirectEvents(this.$marker, redirectedEvents)
	},

	beforeDestroy () {
		if (this.$marker) {
			this.$marker.setMap(null)
		}
	},
}
