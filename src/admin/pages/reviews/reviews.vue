<template>
  <div class="reviews-component">
    <div class="main-content">
      <div class="container">
        <div class="header">
          <h2 class="title">Блок «Отзывы»</h2>
        </div>
      </div>
      <div class="container container--phone">
        <add-review 
          :emptyFormVisible="empty"
          v-if="emptyFormVisible"
          @cancel="emptyFormVisible = false"
          @edit='editMode = true'
          />
        <div class="reviews-wrapper">
          <ul class="reviews" v-if="empty === false">
            <li class="reviews__item"
                @click="emptyFormVisible = true"
                @handleSubmit="emptyFormVisible = false"
                >
              <button class="add-button">
                <div class="add-button__icon"></div>
                <div class="add-button__text">Добавить работу</div>
              </button>
            </li>
            <li class="reviews__item" v-for="review in reviews" :key="review.id" >
              <review-work 
                :review='review' 
                @remove-review='removeReview(review.id)'
                @edit-review="editReview(review.id, $event)" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import reviewWork from '../../components/reviewWork';
import addReview from '../../components/addReview';
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    empty: Boolean
  },
  components: {
    reviewWork,
    addReview
  },
  data() {
    return {
      emptyFormVisible: false,
      editMode: true
    }
  },
  computed: {
    ...mapState("reviews", {
      reviews: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      showTooltip: 'tooltips/show',
      fetchReviewsAction: "reviews/fetch",
      removeReviewAction: "reviews/remove",
      editReviewAction: "reviews/edit"
    }),
    removeReview(reviewId) {
      this.removeReviewAction(reviewId);
      this.showTooltip({
        text: 'Отзыв удален',
        type: "error"
      });
    },
    async editReview(reviewId, reviewAuth, reviewOcc, reviewText) {
      const editedReview = {
        id: reviewId,
        author: reviewAuth,
        occ: reviewOcc,
        text: reviewText
      }
      await this.editReviewAction(editedReview);
      editedReview.editMode = true;
      this.showTooltip({
        text: 'Отзыв обновлен',
        type: "succeess"
      });
      console.log('hey');
    }    
  },
  mounted() {
    this.fetchReviewsAction();
  },
}
</script>

<style lang="postcss" scoped src='./reviews.pcss'></style>