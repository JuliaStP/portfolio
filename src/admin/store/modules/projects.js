export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_PROJECT(state, newProject) {
      state.data.push(newProject);
    },
    SET_PROJECTS(state, projects) {
      state.data = projects
    },
    EDIT_PROJECT(state, projectToEdit){
      state.data = state.data.map(project => {
        if (project.id === projectToEdit.project.id) {
          project = projectToEdit.project;
        }
        return project;
      })
    },
    REMOVE_PROJECT(state, projectToRemove) {
      state.data = state.data.filter((project) => {
        return project.id !== projectToRemove;
      });
    },
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
    },

    async edit({ commit }, newPro) {
      try {
        const {id, title, link, description, text} = newPro;
        const { data } = await this.$axios.post(`/works/${id}`, { title, link, description, text });
        commit('EDIT_PROJECT', data)
      } catch (error) {
        throw new Error("Произошла ошибка!")
      }
    },
    
    async remove({ commit }, projectToRemove) {
      try {
        const { data } = await this.$axios.delete(`/works/${projectToRemove}`);
        commit('REMOVE_PROJECT', projectToRemove)
      } catch (error) {
        throw new Error("Произошла ошибка!")
      }
    },
  },
};