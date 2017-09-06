import 'vue-resize/dist/vue-resize.css'
import { loader } from './lib-loader'

import Map from './components/Map.vue'

function registerComponents (Vue, prefix) {
	Vue.component(`${prefix}map`, Map)
}

const plugin = {
	install (Vue, options) {
		const finalOptions = Object.assign({}, {
			installComponents: true,
			componentsPrefix: 'google-',
		}, options)

		if (finalOptions.installComponents) {
			registerComponents(Vue, finalOptions.componentsPrefix)
		}

		if (finalOptions.load) {
			loader.load(finalOptions.load)
		}
	},
	loader,
	// Components
	Map,
}

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

export default plugin
