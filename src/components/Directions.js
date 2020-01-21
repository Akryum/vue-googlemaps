import DirectionsRenderer from "./DirectionsRenderer"
import DirectionsService from "./DirectionsService"

export default {
	name: 'GoogleMapsDirections',
	data() {
		return {
			directions: null
		}
	},

	props: {
		//#region DirectionsService

		origin: {
			type: String | Object,
			required: true,
		},
		destination: {
			type: String | Object,
			required: true,
		},
		travelMode: {
			type: String,
			default: "DRIVING",
		},
		transitOptions: {
			type: Object,
			default: null,
		},
		unitSystem: {
			type: Array,
			default: null,
		},
		waypoints: {
			type: String | Object,
			default: null,
		},
		optimizeWaypoints: {
			type: Boolean,
			default: null,
		},
		provideRouteAlternatives: {
			type: Boolean,
			default: null,
		},
		avoidFerries: {
			type: Boolean,
			default: null,
		},
		avoidHighways: {
			type: Boolean,
			default: null,
		},
		avoidTolls: {
			type: Boolean,
			default: null,
		},
		region: {
			type: String,
			default: null,
		},

		//#endregion

		//#region DirectionsRenderer

		draggable: {
			type: Boolean,
			default: null
		},
		hideRouteList: {
			type: Boolean,
			default: null
		},
		infoWindow: {
			type: Object,
			default: null
		},
		markerOptions: {
			type: Object,
			default: null
		},
		panel: {
			type: Node,
			default: null
		},
		polylineOptions: {
			type: Object,
			default: null
		},
		preserveViewport: {
			type: Boolean,
			default: null
		},
		routeIndex: {
			type: Number,
			default: null
		},
		supressBicycleLayer: {
			type: Boolean,
			default: null
		},
		suppressInfoWindows: {
			type: Boolean,
			default: null
		},
		suppressMarkers: {
			type: Boolean,
			default: null
		},
		suppressPolylines: {
			type: Boolean,
			default: null
		}

		//#endregion
	},
	computed: {
		directionsRequest() {
			return { 
				origin: this.origin,
				destination: this.destination,
				travelMode: this.travelMode,
				transitOptions: this.transitOptions,
				unitSystem: this.unitSystem,
				waypoints: this.waypoints,
				optimizeWaypoints: this.optimizeWaypoints,
				provideRouteAlternatives: this.provideRouteAlternatives,
				avoidFerries: this.avoidFerries,
				avoidHighways: this.avoidHighways,
				avoidTolls: this.avoidTolls,
				region: this.region
			}
		},
		directionsRendererOptions() {
			return {
				options: {
					...(this.directions) && { directions: this.directions },
					draggable: this.draggable,
					hideRouteList: this.hideRouteList,
					infoWindow: this.infoWindow,
					markerOptions: this.markerOptions,
					panel: this.panel,
					polylineOptions: this.polylineOptions,
					preserveViewport: this.preserveViewport,
					routeIndex: this.routeIndex,
					supressBicycleLayer: this.supressBicycleLayer,
					suppressInfoWindows: this.suppressInfoWindows,
					suppressMarkers: this.suppressMarkers,
					suppressPolylines: this.suppressPolylines
				}
			}
			
		}
	},
	render (h) {
		return h(
			'div',
			{ },
			[
				h(DirectionsService, {
					props: {
				  		request: this.directionsRequest
					},
					on: {
						results: ($event) => {
							this.directions = $event;
						}
					},
				}),
			  	h(DirectionsRenderer, {
					props: this.directionsRendererOptions
				})
			]
		)
	},
}
