<template>
	<div class="simple-demo">
		<!-- Toolbar -->
		<md-toolbar>
			<h2 class="md-title" style="flex: 1;">Simple vue-googlemaps demo</h2>
			
			<md-button
				class="md-icon-button"
				:disabled="!userPosition"
				@click="centerOnUser"
			>
				<md-icon>gps_fixed</md-icon>
			</md-button>
		</md-toolbar>
		
		<!-- Map -->
		<googlemaps-map
			ref="map"
			class="map"
			:center.sync="center"
			:zoom.sync="zoom"
		>
			<!-- User Position -->
			<googlemaps-user-position
				@update:position="setUserPosition" />
			
			<!-- Marker -->
			<googlemaps-marker
				title="Paris"
				:position="{ lat: 48.8735, lng: 2.2951 }" />
		</googlemaps-map>
	</div>
</template>

<script>
export default {
	data () {
		return {
			center: {
				lat: 48.853,
				lng: 2.298,
			},
			userPosition: null,
			zoom: 12,
		}
	},

	methods: {
		centerOnUser () {
			if (this.userPosition) {
				this.center = this.userPosition
			}
		},

		setUserPosition (position) {
			this.userPosition = position
		},
	},
}
</script>

<style lang="stylus" scoped>
.simple-demo {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.map {
	flex: 100% 1 1;
}
</style>

