import VueRouter from 'vue-router'
import store from './store'

import SimpleMap from './components/SimpleMap.vue'
import DirectionsMap from './components/DirectionsMap.vue'
import NearbyPlaces from './components/NearbyPlaces.vue'
import LocationGeocoder from './components/LocationGeocoder.vue'
import PlaceDetails from './components/PlaceDetails.vue'

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', name: 'simple', component: SimpleMap },
		{ path: '/directions', name: 'directions', component: DirectionsMap },
		{ path: '/nearby', name: 'nearby', component: NearbyPlaces },
		{ path: '/geocoder', name: 'geocoder', component: LocationGeocoder },
		{ path: '/place-details', name: 'place-details', component: PlaceDetails },
	],
})

router.afterEach(() => {
	store.dispatch('layout/setSideNavOpen', false)
})

export default router
