export function autoCall (value) {
	return typeof value === 'function' ? value() : value
}

export function capitalize (text) {
	return text.charAt(0).toUpperCase() + text.slice(1)
}
