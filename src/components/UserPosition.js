import Ready from '../mixins/Ready'
import Marker from './Marker'
import Circle from './Circle'

let defaultPositionStyle
const defaultAccuracyStyle = {
	strokeColor: '#4285F4',
	strokeOpacity: 0.25,
	fillColor: '#4285F4',
	fillOpacity: 0.2,
	strokeWeight: 1,
}

export default {
	name: 'GoogleMapsUserPosition',

	mixins: [
		Ready,
	],

	props: {
		accuracy: {
			default: 0,
		},
		accuracyStyle: {
			type: Object,
			default: null,
		},
		disableWatch: {
			type: Boolean,
			default: false,
		},
		hideAccuracy: {
			type: Boolean,
			default: false,
		},
		minimumAccuracy: {
			default: 1000,
		},
		position: {
			type: Object,
		},
		positionStyle: {
			type: Object,
			default: null,
		},
		positionOptions: {
			type: Object,
			default: () => ({
				enableHighAccuracy: true,
				maximumAge: 1000,
			}),
		},
	},

	data () {
		return {
			currentPosition: null,
			currentAccuracy: null,
		}
	},

	watch: {
		position (value) {
			this.currentPosition = value
		},
		accuracy (value) {
			this.currentAccuracy = value
		},
		disableWatch (value, oldValue) {
			if (value !== oldValue) {
				if (value) {
					this.stopWatch()
				} else {
					this.startWatch()
				}
			}
		},
		positionOptions (value) {
			if (!this.disableWatch) {
				this.stopWatch()
				this.startWatch()
			}
		},
	},

	methods: {
		startWatch () {
			if (navigator.geolocation) {
				this.$_watchId = navigator.geolocation.watchPosition(
					this.updatePosition,
					this.onWatchError,
					this.positionOptions
				)
			} else {
				console.warn('GoogleMapsUserPosition: navigator.geolocation not supported')
				this.$emit('error', new Error('unsupported'))
			}
		},

		stopWatch () {
			if (navigator.geolocation) {
				navigator.geolocation.clearWatch(this.$_watchId)
			}
		},

		updatePosition (position) {
			this.currentPosition = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			}
			this.$emit('update:position', this.currentPosition)
			this.currentAccuracy = position.coords.accuracy
			this.$emit('update:accuracy', this.currentAccuracy)
		},

		onWatchError (e) {
			this.$emit('error', e)
		},
	},

	render (h) {
		const markers = []
		if (
			this.googleMapsReady &&
			this.currentPosition &&
			(
				this.minimumAccuracy === null ||
				this.currentAccuracy <= this.minimumAccuracy
			)
		) {
			markers.push(
				h(Marker, {
					props: {
						clickable: false,
						icon: this.positionStyle || defaultPositionStyle,
						optimized: false,
						position: this.currentPosition,
						zIndex: 3,
					},
				})
			)
			if (!this.hideAccuracy) {
				markers.push(
					h(Circle, {
						props: {
							clickable: false,
							radius: this.currentAccuracy,
							options: this.accuracyStyle || defaultAccuracyStyle,
							center: this.currentPosition,
							zIndex: 1,
						},
					})
				)
			}
		}

		return h('div', markers)
	},

	googleMapsReady () {
		defaultPositionStyle = {
			path: window.google.maps.SymbolPath.CIRCLE,
			fillColor: '#4285F4',
			fillOpacity: 1,
			scale: 6,
			strokeColor: 'white',
			strokeWeight: 2,
		}

		if (!this.disableWatch) {
			this.startWatch()
		}
	},

	beforeDestroy () {
		this.stopWatch()
	},
}
