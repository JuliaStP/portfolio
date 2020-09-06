export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD__PROJECT(state, newProject) {
      state.data.push(newProject);
    },
    SET__PROJECTS(state, projects) {
      state.data = projects
    }
  },
  actions: {
    async add({ commit }, newProject) {
      const formData = new FormData();

      Object.keys(newProject).forEach(item => {
        formData.append(item, newProject[item]);
      })

      try {
        const { data } = await this.$axios.post('/works', formData);
        commit('ADD_PROJECT', data);
      } catch (error) {
        console.log('error');
      }
    },

    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get('/works/369');
        commit('SET_PROJECTS', data);
      } catch (error) {
        console.log('error');
      }
    }
  },
};