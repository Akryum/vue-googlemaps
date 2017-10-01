<template>
	<div class="locationGeocoder demo">
		<md-toolbar>
			<md-button
				class="md-icon-button"
				@click="toggleSideNav"
			>
				<md-icon>menu</md-icon>
			</md-button>

			<h2 class="md-title" style="flex: 1;">Place details</h2>
			
			<md-button
				class="md-icon-button"
				:disabled="!userPosition"
				@click="centerOnUser"
			>
				<md-icon>my_location</md-icon>
			</md-button>
		</md-toolbar>

		<div class="panes">
			<!-- Map -->
			<googlemaps-map
				class="map"
				:center.sync="center"
				:zoom="12"
				@click="onClick"
			>
				<!-- User Position -->
				<googlemaps-user-position
					@update:position="setUserPosition" />

				<googlemaps-marker
					v-if="placeLocation"
					title="Searched location"
					:position="placeLocation" />

			</googlemaps-map>

			<!-- Places list -->
			<googlemaps-place-details
				class="results-pane"
				ref="results"
				:request="placeDetailsRequest"
				@results="onResults"
			>
				<template scope="props">
					<div v-if="!placeId" class="tip overlay">
						<md-icon class="md-size-2x">assistant</md-icon>
						<div>Click an icon on the map</div>
					</div>

					<div class="details" v-else-if="props.results">
						<md-subheader class="md-inset">Place details</md-subheader>
						<div v-if="props.results.photos" class="photos">
							<div
								v-for="(photo, index) of props.results.photos"
								:key="index"
								class="photo">
								<img :src="photo.getUrl({ maxWidth: 400, maxHeight:300 })" />
							</div>
						</div>
						<div class="name">{{ props.results.name }}</div>
						<div class="address">{{ props.results.formatted_address }}</div>
						<div class="rating" v-if="props.results.rating">
							<md-rating-bar :value="props.results.rating" class="md-primary" />
						</div>
						<div class="phone" v-if="props.results.international_phone_number">
							<md-icon>phone</md-icon>
							<a :href="`tel:${props.results.international_phone_number}`">
								{{ props.results.international_phone_number }}
							</a>
						</div>
						<div class="website" v-if="props.results.website">
							<md-icon>public</md-icon>
							<a :href="props.results.website" target="_blank">
								{{ props.results.website }}
							</a>
						</div>
					</div>

					<LoadingOverlay v-if="props.loading"/>
				</template>
			</googlemaps-place-details>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	data () {
		return {
			center: {
				lat: 48.853,
				lng: 2.298,
			},
			placeId: null,
			placeLocation: null,
			userPosition: null,
		}
	},

	computed: {
		placeDetailsRequest () {
			if (this.placeId) {
				return {
					placeId: this.placeId,
				}
			}
		},
	},

	methods: {
		...mapActions('layout', [
			'toggleSideNav',
		]),

		centerOnUser () {
			if (this.userPosition) {
				this.center = this.userPosition
			}
		},

		onClick (event) {
			event.stop()
			this.placeLocation = null
			this.placeId = event.placeId
			this.$refs.results.$el.scrollTop = 0
		},

		onResults (results) {
			if (results) {
				this.placeLocation = results.geometry.location
			}
		},

		setUserPosition (position) {
			this.userPosition = position
		},
	},
}
</script>

<style lang="stylus" scoped>
.demo {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.panes {
	flex: 1;
	display: flex;
	flex-direction: row;
	align-items: stretch;
}

.map {
	flex: 1;
}

.results-pane {
	overflow: auto;
	width: 400px;
	position: relative;

	.details {
		> div {
			padding: 8px 16px;
		}

		.name {
			font-size: 20px;
			margin-top: 12px;
		}

		.address {
			color: #888;
		}

		.photos {
			padding: 0;
			display: flex;
			flex-direction: row;
			overflow-x: auto;
			overflow-y: hidden;
			align-items: center;
			background: #333;

			.photo {
				flex: auto 0 0;
				overflow: hidden;
			}
		}

		.rating {
			pointer-events: none;
		}
	}
}
</style>
