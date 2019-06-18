import Service from '../mixins/Service'

const boundProps = [
	'origin',
	'destination',
	'travelMode',
]

export default {
	name: 'GoogleMapsDirections',

	mixins: [
		Service,
	],

	props: {
		origin: {
			type: String,
		},
		destination: {
			type: String,
		},
		travelMode: {
			type: String,
			default: 'DRIVING',
		},
		waypoints: {
			type: Array,
		},
		optimizeWaypoints: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		createServices () {
			this.$_directionService = new window.google.maps.DirectionsService()
		},

		update () {
			this.loading = true

			if(!this.request || !this.$_directionService) return;

			this.$_directionService.route(this.request, (results, status) => {
				this.setResults(results, status)
				this.$emit('directionResult', results)
				this.loading = false
			})
		},
	},
}
