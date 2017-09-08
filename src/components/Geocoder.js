import Service from '../mixins/Service'

export default {
	name: 'GoogleMapsGeocoder',

	mixins: [
		Service,
	],

	props: {
		disablePlaceDetails: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		createServices () {
			this.$geocoder = new window.google.maps.Geocoder()
			this.$placeService = new window.google.maps.places.PlacesService(this.$refs.attributions)		
		},

		getPlaceDetails (result) {
			if (result.place_id) {
				result.placeDetails = null
				this.$placeService.getDetails({
					placeId: result.place_id,
				}, (details, status) => {
					result.placeDetails = details
				})
			}
		},

		update () {
			if (this.googleMapsReady) {
				this.loading = true
				this.$geocoder.geocode(this.request, (results, status) => {
					if (results) {
						!this.disablePlaceDetails && results.forEach(this.getPlaceDetails)
					}
					this.results = results && results.length ? results : null
					this.status = status
					this.loading = false
				})
			}
		},
	},
}
