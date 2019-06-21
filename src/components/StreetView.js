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
		location: {
			type: Object,
		},
	},

	methods: {
		createServices () {
			this.$_streetViewService = new window.google.maps.StreetViewService()
		},

		update () {
			this.loading = true

			if (!this.request || !this.$_streetViewService) return

			this.$_streetViewService.getPanorama(this.request, (results, status) => {
				console.log(results);
				this.setResults(results, status)
				this.$emit('streetViewResult', results)
				this.loading = false
			})
		},
	},
}
