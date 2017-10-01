<template>
	<div class="locationGeocoder demo">
		<md-toolbar>
			<md-button
				class="md-icon-button"
				@click="toggleSideNav"
			>
				<md-icon>menu</md-icon>
			</md-button>

			<h2 class="md-title" style="flex: 1;">Geocoder</h2>
			
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
				:options="mapOptions"
				:zoom="12"
				@click="onClick"
			>
				<!-- User Position -->
				<googlemaps-user-position
					@update:position="setUserPosition" />

				<googlemaps-marker
					v-if="searchLocation"
					title="Searched location"
					:position="searchLocation" />

			</googlemaps-map>

			<!-- Places list -->
			<googlemaps-geocoder
				class="results-pane"
				ref="results"
				:request="geocoderRequest"
			>
				<template scope="props">
					<div v-if="!searchLocation" class="tip overlay">
						<md-icon class="md-size-2x">assistant</md-icon>
						<div>Click on the map</div>
					</div>
					
					<md-list v-else class="md-double-line">
						<md-subheader class="md-inset">Geocoder</md-subheader>

						<md-list-item
							v-for="result of props.results"
							:key="result.id"
						>
							<!-- Photo -->
							<md-avatar class="photo">
								<img
									v-if="result.photos"
									:src="result.photos[0].getUrl({ maxWidth: 80, maxHeight: 80 })"
								/>
								<md-icon v-else class="md-primary">place</md-icon>
							</md-avatar>
							
							<!-- Infos -->
							<div class="md-list-text-container">
								<template v-if="result.placeDetails">
									<span>{{ result.placeDetails.name }}</span>
									<span>{{ result.placeDetails.vicinity }}</span>
								</template>
								<span v-else>{{ result.formatted_address }}</span>
							</div>
						</md-list-item>
					</md-list>

					<LoadingOverlay v-if="props.loading"/>
				</template>
			</googlemaps-geocoder>
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
			searchLocation: null,
			userPosition: null,
		}
	},

	computed: {
		geocoderRequest () {
			if (this.searchLocation) {
				return {
					location: this.searchLocation,
				}
			}
		},

		mapOptions () {
			return {
				clickableIcons: false,
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

		onClick ({ latLng }) {
			this.searchLocation = latLng
			this.$refs.results.$el.scrollTop = 0
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

	.photo {
		background: #eee;
	}
}
</style>
