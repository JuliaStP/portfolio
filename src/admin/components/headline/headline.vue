<template>
  <div class="headline-component">
    <div class="container healine-container">
      <slot />
        <h4 class="title">{{title}}</h4>
        <div class="buttons">
          <button type='button' class='headline__btn' @click="logout">Выйти</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    title: {
      type: String,
      default: 'Панель администрирования'
    }
  },
  methods: {
    ...mapActions({
      logout: 'user/logout',
    }),
  }
}
</script>

<style lang="postcss" scoped src="./headline.pcss">
  
</style>