import { capitalize } from './misc'

export function bindProp ({
	vm,
	name,
	targetPropName,
	target,
	watcher,
	applier,
	retriever,
	readOnly,
	event,
}) {
	const capitalizedName = capitalize(name)
	const getter = () => target && target[`get${capitalizedName}`]()
	const setter = value => target && target[`set${capitalizedName}`](value)
	const changeEvent = `${name}_changed`

	if (!targetPropName) {
		targetPropName = name
	}
	if (!watcher) {
		watcher = value => value
	}
	if (!applier) {
		applier = (value, oldValue, set) => {
			if (value !== oldValue) {
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

	function handleChanged () {
		vm.$emit(event, retriever(getter()))
	}

	target.addEventListener(changeEvent, handleChanged)

	return () => {
		target.removeEventListener(changeEvent, handleChanged)
	}
}
