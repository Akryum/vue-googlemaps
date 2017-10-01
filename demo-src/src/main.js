import '../../dist/vue-googlemaps.css'
import 'vue-material/dist/vue-material.css'

import './plugins'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './components/App.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'

Vue.component('LoadingOverlay', LoadingOverlay)

// eslint-disable-next-line no-new
new Vue({
	el: '#app',
	router,
	store,
	...App,
})
