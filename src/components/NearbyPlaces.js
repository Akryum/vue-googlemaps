import Service from '../mixins/Service'

export default {
	name: 'GoogleMapsNearbyPlaces',

	mixins: [
		Service,
	],

	methods: {
		createServices () {
			this.$placeService = new window.google.maps.places.PlacesService(this.$refs.attributions)
		},

		update () {
			this.loading = true
			this.nearbyPlaces = null
			this.$placeService.nearbySearch(this.request, (results, status) => {
				this.results = results && results.length ? results : null
				this.stats = status
				this.loading = false
			})
		},
	},
}
