<template>
  <div class="reviews-component">
    <div class="main-content">
      <div class="container">
        <div class="header">
          <h2 class="title">Блок «Отзывы»</h2>
        </div>
        <div class="reviews-wrapper">
          <ul class="reviews">
            <li class="reviews__item">
              <button class="add-button">
                <div class="add-button__icon"></div>
                <div class="add-button__text">Добавить работу</div>
              </button>
            </li>
            <li class="reviews__item" (v-for="review in reviews" )>
              <card-work ( :review='review' ) />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import cardWork from '../../components/cardWork';

export default {
  components: {
    cardWork
  },
}
</script>

<style lang="postcss" scoped src='./reviews.pcss'></style>