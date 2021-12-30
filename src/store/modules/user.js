export default {
  state: {
    number: 5,
  },
  mutations: {
    setUser(state, val) {
      state.number = val;
    },
  },
  actions: {
    setUserActions({ commit }, val) {
      commit("setUser", val);
    },
  },
  namespaced: true,
};
