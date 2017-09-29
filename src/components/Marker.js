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
		const options = Object.assign({}, this.$props)
		options.map = this.$_map

		if (options.position && typeof options.position.equals !== 'function') {
			options.position = new window.google.maps.LatLng(options.position)
		}

		this.$_marker = new window.google.maps.Marker(options)
		this.bindProps(this.$_marker, boundProps)
		this.redirectEvents(this.$_marker, redirectedEvents)
	},

	beforeDestroy () {
		if (this.$_marker) {
			this.$_marker.setMap(null)
		}
	},
}
