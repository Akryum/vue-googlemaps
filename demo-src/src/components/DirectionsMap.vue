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

            <h2 class="md-title" style="flex: 1;">Directions map</h2>

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

            <googlemaps-direction
                    class="results-pane"
                    ref="results"
                    :request="directionRequest"
                    v-on:directionResult="newDirectionResult"
            >

                <template slot-scope="props" v-if="props.results">
                    <googlemaps-direction-draw :directionResult="props.results"></googlemaps-direction-draw>
                </template>

            </googlemaps-direction>

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
    			directionRequest: null,
    		}
    	},

    	mounted () {
    	  this.setDirectionRequest()
    	},

    	methods: {
    		...mapActions('layout', [
    			'toggleSideNav',
    		]),

    		polylineClicked () {
    			console.log('clicked')

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
    		setDirectionRequest () {
    			this.directionRequest = {
    				origin: 'Dronning Louises Bro, 1371 København',
    				destination: 'Nørre Voldgade 3, 1358 København',
    				travelMode: 'DRIVING',
    				optimizeWaypoints: false,
    				waypoints: [
    					{
    						location: 'Nørre Farimagsgade 53, 1364 København',
    						stopover: true,
    					},
    					{
    						location: 'Statens Naturhistoriske Museum, Gothersgade 130, 1153 København',
    						stopover: true,
    					},
    					{
    						location: 'Øster Farimagsgade 17, 1307 København',
    						stopover: true,
    					},
    				],
    			}
    		},

    		newDirectionResult (result) {
    			// handle result
    		},

    		mapClick () {
    			this.directionRequest = {
    				origin: 'Baldersgade 6, 2200 København',
    				destination: {lat: 55.698180, lng: 12.543964},
    				travelMode: 'DRIVING',
    				optimizeWaypoints: false,
    				waypoints: [
    					{
    						location: 'Øster Farimagsgade 17, 1307 København',
    						stopover: true,
    					},
    					{
    						location: 'Statens Naturhistoriske Museum, Gothersgade 130, 1153 København',
    						stopover: true,
    					},
    					{
    						location: 'Nørre Farimagsgade 53, 1364 København',
    						stopover: true,
    					},
    					{
    						location: 'Brøndbyøstervej 101, 2605 Brøndbyvester',
    						stopover: true,
    					},
    					{
    						location: 'Nørre Voldgade 3, 1358 København',
    						stopover: true,
    					},
    				],
    			}
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

