import '../../dist/vue-googlemaps.css'
import 'vue-material/dist/vue-material.css'

import Vue from 'vue'
import VueGoogleMaps from '../../'
import VueMaterial from 'vue-material'
import App from './components/App.vue'

Vue.use(VueMaterial)

Vue.use(VueGoogleMaps, {
	load: {
		apiKey: process.env.GOOGLE_API_KEY,
		libraries: ['places'],
	},
})

// eslint-disable-next-line no-new
new Vue({
	el: '#app',
	...App,
})
