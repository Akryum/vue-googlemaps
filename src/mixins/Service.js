import Ready from '../mixins/Ready'

export default {
	mixins: [
		Ready,
	],

	props: {
		filter: {
			type: Function,
			default: null,
		},
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

	computed: {
		filteredResults () {
			if (this.results && this.filter) {
				return this.results.filter(this.filter)
			} else {
				return this.results
			}
		},

		finalResults () {
			const results = this.filteredResults
			return results && (!Array.isArray(results) || results.length) ? results : null
		},
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
				results: this.finalResults,
				staus: this.staus,
			}
		},

		setResults (results, status) {
			this.results = results
			this.status = status
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
