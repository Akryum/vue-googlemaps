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
	'options',
]

const redirectedMethods = [
	'panBy',
	'panTo',
	'panToBounds',
	'fitBounds',
	'getBounds',
]

const redirectedEvents = [
	'click',
	'dblclick',
	'drag',
	'dragend',
	'dragstart',
	'mousedown',
	'mouseup',
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
			required: true,
			type: Number,
		},
	},

	beforeCreate () {
		this.$_mapPromises = []
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

		this.$_map = new window.google.maps.Map(element, options)

		this.bindProps(this.$_map, boundProps)

		this.listen(this.$_map, 'bounds_changed', () => {
			this.$emit('update:bounds', this.$_map.getBounds())
		})

		this.listen(this.$_map, 'idle', () => {
			this.$emit('idle', this)
			this.lastCenter = this.$_map.getCenter()
		})

		this.lastCenter = this.$_map.getCenter()

		this.redirectEvents(this.$_map, redirectedEvents)

		// Code that awaits `$_getMap()`
		this.$_mapPromises.forEach(resolve => resolve(this.$_map))
	},

	watch: {
		options: {
			handler: 'updateOptions',
			deep: true,
		},
	},

	methods: {
		...redirectMethods({
			target () {
				return this.$_map
			},
			names: redirectedMethods,
		}),

		resize (preserveCenter = true) {
			if (this.$_map) {
				// let center
				// preserveCenter && (center = this.$_map.getCenter())
				window.google.maps.event.trigger(this.$_map, 'resize')
				preserveCenter && this.$_map.setCenter(this.lastCenter)
			}
		},

		visibilityChanged (isVisible) {
			if (isVisible) {
				this.$nextTick(this.resize)
			}
		},

		$_getMap () {
			if (this.$_map) {
				return Promise.resolve(this.$_map)
			} else {
				return new Promise(resolve => {
					this.$_mapPromises.push(resolve)
				})
			}
		},

		updateOptions (options) {
			this.$_map && this.$_map.setOptions(options || this.$props)
		},
	},
}
</script>

<style lang="stylus">
@import '../../node_modules/vue-resize/dist/vue-resize.css';
</style>

<style lang="stylus" scoped>
.vue-google-map {
	position: relative;

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
}
</style>
