<template>
	<div class="vue-google-map" v-observe-visibility="visibilityChanged">
		<div ref="map" class="target"></div>
		<div class="hidden-content">
			<slot></slot>
		</div>
		<slot name="visible"></slot>
		<resize-observer @notify="resize" />
	</div>
</template>

<script>
import { ResizeObserver } from 'vue-resize/dist/vue-resize'
// import { ObserveVisibility } from 'vue-observe-visibility'
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
		applier: (value, oldValue, set) => {
			if (value.lat !== oldValue.lat || value.lng !== oldValue.lng) {
				set(value)
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
		// ObserveVisibility,
	},

	props: {
		bounds: {
			type: Object,
		},
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

		ready () {
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
}
</script>

<style lang="stylus" scoped>
.vue-google-map {
	position: relative;
}

.target {
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
