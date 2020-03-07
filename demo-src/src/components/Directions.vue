<template>
	<div class="directions demo">
		<md-toolbar>
			<md-button
				class="md-icon-button"
				@click="toggleSideNav"
			>
				<md-icon>menu</md-icon>
			</md-button>

			<h2 class="md-title" style="flex: 1;">Directions</h2>
		</md-toolbar>

		<div class="panes">
			<!-- Map -->
			<googlemaps-map
				class="map"
				:center.sync="center"
				:options="mapOptions"
				:zoom="12"
			>
                <googlemaps-directions :origin="origin" :destination="destination" :waypoints="waypoints" />
			</googlemaps-map>
            <div>
                <md-toolbar md-theme="white">
                    <md-button class="md-icon-button" @click="addDestination">
                        <md-icon>add</md-icon>
                    </md-button>
                </md-toolbar>
                <md-list>
                    <md-list-item v-for="(node, index) in nodes" v-bind:key="index">
                        {{ node }}
                    </md-list-item>
                </md-list>
            </div> 
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
			nodes: [
                "Eibergsestraat 207, Haaksbergen, Netherlands",
                "Kallenbroekerweg 153, Barneveld, Netherlands",
                "Hollandsekade 165, Nieuwkoop, Netherlands"
            ],
		}
	},

	computed: {
		origin() {
            if (this.nodes && this.nodes.length > 1) {
                return this.nodes[0];
            } else {
                return null;
            }
        },
        waypoints() {
            if (this.nodes && this.nodes.length > 2) {
                return this.nodes.slice(1, -1).map(x => {
                    return {
                        location: x
                    }
                });
            } else {
                return null;
            }
        },
        destination() {
            if (this.nodes && this.nodes.length > 1) {
                return this.nodes[this.nodes.length - 1];
            } else {
                return null;
            }
        },


		mapOptions () {
			return {
				clickableIcons: false,
			}
        }
	},

	methods: {
		...mapActions('layout', [
			'toggleSideNav',
        ]),
        addDestination() {
            this.nodes.push(prompt("Enter address"));
        }
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
</style>
