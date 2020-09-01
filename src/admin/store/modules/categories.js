export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    SET_CATEGORY: (state, categories) => (state.data = categories),
    ADD_CATEGORY: (state, category) => state.data.unshift(category),
    EDIT_CATEGORY: (state, categoryToEdit) => {
      
      state.data = state.data.map(category => {
        if (category.id === categoryToEdit.category.id) {
          category.category = categoryToEdit.category.category;
        }
      });

    },
    DELETE_CATEGORY: (state, categoryToRemove) => {
      state.data = state.data.filter((category) => {
        return category.id !== categoryToRemove;
      });
    },

    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map(category => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }
        return category;
      })
    },
    EDIT_SKILL: (state, skillToEdit) => {
      const editSkillInCat = category => {
        category.skills = category.skills.map(skill => {
          return skill.id === skillToEdit.id ? skillToEdit : skill
        });
      }

      const findCat = category => {
        if(category.id === skillToEdit.category) {
          editSkillInCat(category);
        }
        return category;
      }
      state.data = state.data.map(findCat);
    },
    DELETE_SKILL: (state, skillToRemove) => {
      state.data = state.data.map(category => {
        if (category.id === skillToRemove.category) {
          category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id)
        }
        return category;
      })
    }
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
    },
    async edit({ commit }, categoryToEdit) {
      try {
        const { data } = await this.$axios.post(`/categories/${categoryToEdit.id}`, categoryToEdit)
        commit('EDIT_CATEGORY', data.category, { root: true })
      } catch (error) {
        console.log(error);
      }
    },
    async remove({ commit }, categoryToRemove) {
      try {
        const { data } = await this.$axios.delete(`/categories/${categoryToRemove}`)
        commit('DELETE_CATEGORY', categoryToRemove)
      } catch (error) {
        console.log(error);
      }
    }
  }
} 