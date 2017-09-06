let config

export function initErrorHandling (Vue) {
	config = Vue.config
}

export function handleError (e, vm, info) {
	if (config.errorHandler) {
		config.errorHandler(e, vm, info)
	} else {
		if (typeof console !== 'undefined') {
			console.error(e)
		} else {
			throw e
		}
	}
}
