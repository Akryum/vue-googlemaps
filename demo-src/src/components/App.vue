<template>
	<div id="app">
		<router-view/>

		<md-sidenav
			ref="sideNav"
			class="md-left md-fixed"
			@open="setSideNavOpen(true)"
			@close="setSideNavOpen(false)"
		>
			<md-toolbar>
				<div class="md-toolbar-container">
					<h3 class="md-title">vue-googlemaps</h3>
				</div>
			</md-toolbar>

			<md-list>
				<md-list-item>
					<router-link :to="{ name: 'simple' }" exact>Simple map</router-link>
				</md-list-item>
				<md-list-item>
					<router-link :to="{ name: 'nearby' }">Nearby places</router-link>
				</md-list-item>
				<md-list-item>
					<router-link :to="{ name: 'geocoder' }">Geocoder</router-link>
				</md-list-item>
				<md-list-item>
					<router-link :to="{ name: 'place-details' }">Place details</router-link>
				</md-list-item>
				<md-list-item>
					<router-link :to="{ name: 'directions' }">Directions map</router-link>
				</md-list-item>
			</md-list>
		</md-sidenav>
	</div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'app',

	computed: {
		...mapGetters('layout', [
			'sideNavOpen',
		]),
	},

	watch: {
		sideNavOpen (val, oldVal) {
			if (val !== oldVal) {
				if (val) {
					this.$refs.sideNav.open()
				} else {
					this.$refs.sideNav.close()
				}
			}
		},
	},

	methods: {
		...mapActions('layout', [
			'setSideNavOpen',
		]),
	},
}
</script>

<style lang="stylus">
html,
body,
#app {
	height: 100%;
}

body {
	margin: 0;
	font-family: 'Roboto', Helvetica, Arial, sans-serif;
}

.tip {
	padding: 12px;
	font-size: 16px;
	color: #aaa;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	&.overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.md-icon {
		margin-top: 0;
		margin-bottom: 16px;
	}
}
</style>
