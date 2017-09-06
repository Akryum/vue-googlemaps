import 'vue-resize/dist/vue-resize.css'
import 'regenerator-runtime/runtime'
import loader from './lib-loader'
import { optionMergeStrategies } from './options'
import { initErrorHandling } from './utils/error'

import Map from './components/Map.vue'
import Marker from './components/Marker'

export {
	Map,
}

function registerComponents (Vue, prefix) {
	Vue.component(`${prefix}map`, Map)
	Vue.component(`${prefix}marker`, Marker)
}

const plugin = {
	install (Vue, options) {
		const finalOptions = Object.assign({}, {
			installComponents: true,
			componentsPrefix: 'google-',
		}, options)

		optionMergeStrategies(Vue)
		initErrorHandling(Vue)

		if (finalOptions.installComponents) {
			registerComponents(Vue, finalOptions.componentsPrefix)
		}

		if (finalOptions.load) {
			loader.load(finalOptions.load)
		}
	},
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue
}
if (GlobalVue) {
	GlobalVue.use(plugin)
}
