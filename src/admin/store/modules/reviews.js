export default {
  namespaced: true,
  state: {
    data: [],
  },
  mutations: {
    ADD_REVIEW(state, newReview) {
      state.data.push(newReview);
    },
    SET__REVIEWS(state, reviews) {
      state.data = reviews;
    },
    EDIT_REVIEW(state, reviewToEdit){
      state.data = state.data.map(review => {
        if (review.id === reviewToEdit.review.id) {
          review = reviewToEdit.review;
        }
        return review;
      })
    },
    REMOVE_REVIEW(state, reviewToRemove) {
      state.data = state.data.filter((review) => {
        return review.id !== reviewToRemove;
      });
    }
  },

  actions: {
    async add({ commit }, newReview) {
      const formData = new FormData();

      Object.keys(newReview).forEach(item => {
        formData.append(item, newReview[item]);
      })

      try {
        const { data } = await this.$axios.post('/reviews', formData);
        commit('ADD_REVIEW', data);
      } catch (error) {
        console.log('error');
      }
    },  
    
    async fetch({ commit }) {
      try {
        const { data } = await this.$axios.get('/reviews/369');
        commit('SET_REVIEWS', data);
      } catch (error) {
        console.log('error');
      }
    },

    async edit({ commit }, editedReview) {
      try {
        const {id, author, occ, text} = editedReview
        const { data } = await this.$axios.post(`/reviews/${id}`, { author, occ, text });
        commit('EDIT_REVIEW', data)
      } catch (error) {
        throw new Error("Произошла ошибка!")
      }
    },  

    async remove({ commit }, reviewToRemove) {
      try {
        const { data } = await this.$axios.delete(`/reviews/${reviewToRemove}`);
        commit('REMOVE_REVIEW', reviewToRemove)
      } catch (error) {
        throw new Error("Произошла ошибка!")
      }
    },
  }
};