import Ready from '../mixins/Ready'

export default {
	mixins: [
		Ready,
	],

	props: {
		request: {
			type: Object,
			required: true,
		},
		tag: {
			type: String,
			default: 'div',
		},
	},

	data () {
		return {
			loading: false,
			results: null,
			status: null,
		}
	},

	watch: {
		request: {
			handler: 'update',
			deep: true,
		},
	},

	methods: {
		createServices () {
			// Override this in components
		},

		getScope () {
			// Override this in components
			return {
				loading: this.loading,
				results: this.results,
				staus: this.staus,
			}
		},

		update () {
			// Override this in components
		},
	},

	googleMapsReady () {
		this.createServices()
		this.update()
	},

	render (h) {
		return h(this.tag, [
			this.$scopedSlots.default(this.getScope()),
			h('span', {
				ref: 'attributions',
			}),
		])
	},
}
