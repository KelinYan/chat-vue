export default {
  state: {
    message: [],
  },
  getters: {
    messageByUser: (state) => (from, to) => {
      return state.message.filter(msg=>msg.);
    },
  },
  mutations: {
    setMessage(state, msg) {
      state.message = msg;
    },
    addMessage(state, msg) {
      state.message.push(...msg);
    },
  },
  actions: {
    setMessage({ commit }, msg) {
      commit("setMessage", msg);
    },
    addMessage({ commit }, msg) {
      commit("addMessage", msg);
    },
  },
  namespaced: true,
};
