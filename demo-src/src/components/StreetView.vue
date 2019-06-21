<template>
    <div class="simple-map demo">
        <!-- Toolbar -->
        <md-toolbar>
            <md-button
                    class="md-icon-button"
                    @click="toggleSideNav"
            >
                <md-icon>menu</md-icon>
            </md-button>

            <h2 class="md-title" style="flex: 1;">StreetView</h2>

            <md-button
                    class="md-icon-button"
                    :disabled="!userPosition"
                    @click="centerOnUser"
            >
                <md-icon>my_location</md-icon>
            </md-button>
        </md-toolbar>

        <!-- Map -->
        <googlemaps-map
                ref="map"
                class="map"
                :center.sync="center"
                :zoom.sync="zoom"
                @click="mapClick()"
        >

            <googlemaps-streetview
                    class="results-pane"
                    ref="results"
                    :request="streetViewRequest"
                    v-on:streetViewResult="newStreetViewResult"
            >

                <template slot-scope="props" v-if="props.results">
                    <googlemaps-streetview-render :streetViewResult="props.results" iconColor="#00a65e"></googlemaps-streetview-render>
                </template>

            </googlemaps-streetview>

        </googlemaps-map>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
    	data () {
    		return {
    			center: {
    				lat: 55.689454,
    				lng: 12.574299,
    			},
    			options: {},
    			userPosition: null,
    			zoom: 12,
    			streetViewRequest: null,
    		}
    	},

    	mounted () {
    	  this.setstreetViewRequest()
    	},

    	methods: {
    		...mapActions('layout', [
    			'toggleSideNav',
    		]),

    		polylineClicked () {
    			const options = {
    				strokeOpacity: Math.random(),
    			}

    			this.options = options
    		},

    		pathChanged (path) {
    			console.log(path)
    		},

    		centerOnUser () {
    			if (this.userPosition) {
    				this.center = this.userPosition
    			}
    		},

    		setUserPosition (position) {
    			this.userPosition = position
    		},
    		setstreetViewRequest () {
    			this.streetViewRequest = {
    				location: {lat: 55.689315, lng: 12.570760},
    			}
    		},

    		newStreetViewResult (result) {
    			// handle result
    		},

    		mapClick () {
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

    .map {
        flex: 100% 1 1;
    }
</style>

