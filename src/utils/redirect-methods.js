export function redirectMethods ({ target, names }) {
	return names.reduce((obj, name) => {
		obj[name] = function (...args) {
			const t = target.call(this)
			if (t) {
				return t[name].apply(t, args)
			}
		}
		return obj
	}, {})
}
