export default {
	namespaced: true,

	state () {
		return {
			sideNavOpen: false,
		}
	},

	getters: {
		sideNavOpen: state => state.sideNavOpen,
	},

	mutations: {
		sideNavOpen (state, value) {
			state.sideNavOpen = value
		},
	},

	actions: {
		setSideNavOpen ({ commit }, value) {
			commit('sideNavOpen', value)
		},

		toggleSideNav ({ commit, getters }) {
			const value = getters.sideNavOpen
			commit('sideNavOpen', !value)
		},
	},
}
