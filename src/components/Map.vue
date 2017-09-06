<template>
	<div class="vue-google-map" v-observe-visibility="visibilityChanged">
		<div ref="map" class="map-view"></div>
		<div class="hidden-content">
			<slot></slot>
		</div>
		<slot name="visible"></slot>
		<resize-observer @notify="resize" />
	</div>
</template>

<script>
import { ResizeObserver } from 'vue-resize'
import { ObserveVisibility } from 'vue-observe-visibility'
import Ready from '../mixins/Ready'
import BoundProps from '../mixins/BoundProps'
import Events from '../mixins/Events'
import { autoCall } from '../utils/misc'
import { redirectMethods } from '../utils/redirect-methods'

const boundProps = [
	{
		name: 'center',
		watcher: value => ({
			lat: autoCall(value.lat),
			lng: autoCall(value.lng),
		}),
		identity: (a, b) => {
			if (a && b) {
				if (typeof a.equals !== 'function') {
					a = new window.google.maps.LatLng(a)
				}
				if (typeof b.equals !== 'function') {
					b = new window.google.maps.LatLng(b)
				}
				return a.equals(b)
			}
		},
		retriever: (value) => ({
			lat: value.lat(),
			lng: value.lng(),
		}),
	},
	'heading',
	'mapTypeId',
	'tilt',
	'zoom',
]

const redirectedMethods = [
	'panBy',
	'panTo',
	'panToBounds',
	'fitBounds',
]

const redirectedEvents = [
	'click',
	'dblclick',
	'drag',
	'dragend',
	'dragstart',
	'idle',
	'mousemove',
	'mouseout',
	'mouseover',
	'resize',
	'rightclick',
	'tilesloaded',
]

export default {
	name: 'GoogleMapsMap',

	mixins: [
		Ready,
		BoundProps,
		Events,
	],

	components: {
		ResizeObserver,
	},

	directives: {
		ObserveVisibility,
	},

	props: {
		center: {
			required: true,
			type: Object,
		},
		heading: {
			type: Number,
		},
		mapTypeId: {
			type: String,
		},
		options: {
			type: Object,
			default: () => ({}),
		},
		tilt: {
			type: Number,
		},
		zoom: {
			required: false,
			type: Number,
		},
	},

	methods: {
		...redirectMethods({
			target () {
				return this.$map
			},
			names: redirectedMethods,
		}),

		resize (preserveCenter = true) {
			if (this.$map) {
				let center
				preserveCenter && (center = this.$map.getCenter())
				window.google.maps.event.trigger(this.$map, 'resize')
				preserveCenter && this.$map.setCenter(center)
			}
		},

		visibilityChanged (isVisible) {
			if (isVisible) {
				this.$nextTick(this.resize)
			}
		},
	},

	googleMapsReady () {
		const element = this.$refs.map

		const options = {
			center: this.center,
			heading: this.heading,
			mapTypeId: this.mapTypeId,
			tilt: this.tilt,
			zoom: this.zoom,
			...this.options,
		}

		this.$map = new window.google.maps.Map(element, options)

		this.bindProps(this.$map, boundProps)

		this.listen(this.$map, 'bounds_changed', () => {
			this.$emit('update:bounds', this.$map.getBounds())
		})

		this.redirectEvents(this.$map, redirectedEvents)
	},
}
</script>

<style lang="stylus" scoped>
.vue-google-map {
	position: relative;
}

.map-view {
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	position: absolute;
}

.hidden-content {
	display: none;
}
</style>
