import VueRouter from 'vue-router'
import store from './store'

import SimpleMap from './components/SimpleMap.vue'
import NearbyPlaces from './components/NearbyPlaces.vue'
import LocationGeocoder from './components/LocationGeocoder.vue'
import PlaceDetails from './components/PlaceDetails.vue'
import Directions from './components/Directions.vue'

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', name: 'simple', component: SimpleMap },
		{ path: '/nearby', name: 'nearby', component: NearbyPlaces },
		{ path: '/geocoder', name: 'geocoder', component: LocationGeocoder },
		{ path: '/place-details', name: 'place-details', component: PlaceDetails },
		{ path: '/directions', name: 'directions', component: Directions },
	],
})

router.afterEach(() => {
	store.dispatch('layout/setSideNavOpen', false)
})

export default router
