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
	name: 'GoogleMapsStreetViewRender',

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
		address: {
			type: String,
			required: false,
		},
	},

	watch: {
		paths: 'updateOptions',
		options: 'updateOptions',
		address: {
			handler (value) {
				value && this.openStreetView()
			},
			deep: true,
		},
	},

	methods: {
		updateOptions (options) {
			this.$_direction && this.$_direction.setOptions(options || this.$props)
		},
		openStreetView () {
			if (!this.address || this.address == '') {
				return
			}

			this.$_geocoder.geocode({address: this.address}, (results, status) => {
				if (status == 'OK') {
					this.$_geo_address = results[0].geometry.location

					this.$_panorama.setPosition(this.$_geo_address)

					this.$_panorama.setPov(/** @type {google.maps.StreetViewPov} */({
						heading: 265,
						pitch: 0,
					}))
					this.$_panorama.setVisible(true)
				}
			})
		},
	},

	render (h) {
		return ''
	},

	googleMapsReady () {
		const options = Object.assign({}, this.$props)
		options.map = this.$_map

		this.$_geocoder = new window.google.maps.Geocoder()
		this.$_panorama = this.$_map.getStreetView()

		this.openStreetView()
	},

	beforeDestroy () {
		// if (this.$_panorama) {
		// 	this.$_panorama.setMap(null)
		// }
	},
}
