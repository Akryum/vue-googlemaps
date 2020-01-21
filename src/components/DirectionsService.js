import Service from '../mixins/Service'

export default {
	name: 'GoogleMapsDirectionsService',

	mixins: [
		Service,
	],

	methods: {
		createServices () {
			this.$_directionsService = new window.google.maps.DirectionsService(this.$refs.attributions)
		},

		update () {
			this.loading = true
			this.$_directionsService.route(this.request, (results, status) => {
				this.setResults(results, status)
				this.loading = false
			})
		},
	},
}
