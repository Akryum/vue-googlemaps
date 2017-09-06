import { capitalize } from './misc'

export function bindProp ({
	vm,
	name,
	targetPropName,
	target,
	watcher,
	identity,
	applier,
	retriever,
	readOnly,
	event,
	changeEvent,
}) {
	if (!targetPropName) {
		targetPropName = name
	}
	if (!changeEvent) {
		changeEvent = `${targetPropName.toLowerCase()}_changed`
	}

	let setValue
	const capitalizedName = capitalize(name)
	const getter = () => target && target[`get${capitalizedName}`]()
	const setter = value => {
		setValue = value
		target && target[`set${capitalizedName}`](value)
	}

	if (!watcher) {
		watcher = value => value
	}
	if (!identity) {
		identity = (a, b) => a === b
	}
	if (!applier) {
		applier = (value, oldValue, set) => {
			if (!identity(value, oldValue)) {
				set(value)
			}
		}
	}
	if (!retriever) {
		retriever = value => value
	}
	if (!event) {
		event = `update:${name}`
	}

	vm.$watch(
		() => watcher(vm[name]),
		(value, oldValue) => applier(value, oldValue, setter)
	)

	const listener = target.addListener(changeEvent, () => {
		const value = retriever(getter())
		if (!identity(value, setValue)) {
			vm.$emit(event, value)
			setValue = value
		}
	})

	return () => {
		listener.remove()
	}
}
