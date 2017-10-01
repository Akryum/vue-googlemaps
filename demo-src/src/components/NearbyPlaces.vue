<template>
	<div class="nearby-places demo">
		<md-toolbar>
			<md-button
				class="md-icon-button"
				@click="toggleSideNav"
			>
				<md-icon>menu</md-icon>
			</md-button>

			<h2 class="md-title" style="flex: 1;">Nearby places</h2>
			
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
				@idle="onIdle"
			>
				<!-- User Position -->
				<googlemaps-user-position
					@update:position="setUserPosition" />
			</googlemaps-map>

			<!-- Places list -->
			<googlemaps-nearby-places
				class="results-pane"
				ref="results"
				:request="nearbyRequest"
				:filter="result => !result.types.includes('locality')"
			>
				<template scope="props">
					<md-list class="md-double-line">
						<md-subheader class="md-inset">Nearby places</md-subheader>

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
								<span>{{ result.name }}</span>
								<span>{{ result.vicinity }}</span>
							</div>
						</md-list-item>
					</md-list>

					<LoadingOverlay v-if="props.loading"/>
				</template>
			</googlemaps-nearby-places>
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
			searchBounds: null,
			userPosition: null,
		}
	},

	computed: {
		nearbyRequest () {
			if (this.searchBounds) {
				return {
					bounds: this.searchBounds,
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

		onIdle (map) {
			this.searchBounds = map.getBounds()
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
