export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_CATEGORY: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
  },
  actions: {
    async create({ commit }, title) {
      try {
        const { data } = await this.$axios.post('/categories', { title })
        commit('ADD_CATEGORY', data);
      } catch (error) {
        throw new Error('ошибка');
      }
    },
    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get('/categories/369')
        commit('SET_CATEGORY', data)
      } catch (error) {
        console.log(error);
      }
    }
  }
} 