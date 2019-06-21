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
		drawDistanceWindow: {
			type: Boolean,
			default: true,
		},
		iconColor: {
			type: String,
			default: 80,
		},
	},

	watch: {
		paths: 'updateOptions',
		options: 'updateOptions',
		directionResult: {
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

		calcTravelInfo  () {
			let time = 0
			let distance = 0
			this.directionResult.routes[0].legs.forEach(leg => {
				distance += leg.distance.value
				time += leg.duration.value
			})

			const km = distance / 1000

			return {
				time: this.secondsToHms(time),
				distance: km.toFixed(1),
			}
		},

		setInfoWindow (update = false) {
			const step = 1
			const response = this.directionResult
			const travelInfo = this.calcTravelInfo()

			if (!update) {
				this.$_infoWindow = new window.google.maps.InfoWindow()
			}

			this.$_infoWindow.setContent('<b>' + travelInfo.distance + '</b> km <br><b>' + travelInfo.time + '</b>')
			// this.$_infoWindow.setPosition(response.routes[0].legs[0].steps[step].end_location)
			this.$_infoWindow.setPosition(response.routes[0].legs[this.maxLegDistance()].steps[step].end_location)
			this.$_infoWindow.open(this.$_map)
		},

		maxLegDistance () {
			let legIndex = 0
			let distance = 0

			this.directionResult.routes[0].legs.forEach((leg, index) => {
				const legDistance = leg.distance.value
				if (legDistance > distance) {
					legIndex = index
					distance = legDistance
				}
			})

			return legIndex
		},

		secondsToHms (d) {
			d = Number(d)
			var h = Math.floor(d / 3600)
			var m = Math.floor(d % 3600 / 60)
			var s = Math.floor(d % 3600 % 60)

			var hDisplay = h > 0 ? h + (h == 1 ? ' time, ' : ' timer, ') : ''
			var mDisplay = m > 0 ? m + (m == 1 ? ' minut' : ' minutter') : ''
			// var sDisplay = s > 0 ? s + (s == 1 ? ' sekund' : ' sekunder') : ''

			// put sDisplay on to display seconds - and a comma to minutes word
			return hDisplay + mDisplay
		},

		rerender () {
			const options = Object.assign({}, this.$props)
			options.map = this.$_map

			// draw directions
			this.$_direction = this.$_direction_render.setDirections(this.directionResult)

			// draw distance
			if (this.drawDistanceWindow) {
				this.setInfoWindow(true)
			}
		},
	},

	render (h) {
		return ''
	},

	googleMapsReady () {
		const options = Object.assign({}, this.$props)
		options.map = this.$_map

		// draw directions
		this.$_direction_render = new window.google.maps.DirectionsRenderer(options)
		this.$_direction = this.$_direction_render.setDirections(this.directionResult)

		// draw distance
		if (this.drawDistanceWindow) {
			this.setInfoWindow()
		}
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
