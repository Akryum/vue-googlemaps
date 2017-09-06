export function redirectMethods ({ target, names }) {
	return names.reduce((obj, name) => {
		obj[name] = (...args) => {
			const t = target()
			if (t) {
				return t[name].apply(t, args)
			}
		}
		return obj
	}, {})
}
