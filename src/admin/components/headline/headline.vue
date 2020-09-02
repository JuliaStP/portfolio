<template>
  <div class="headline-component">
    <div class="container healine-container">
      <slot />
        <h4 class="title">{{title}}</h4>
        <div class="buttons">
          <button type='button' class='btn'>Выйти</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Панель администрирования'
    }
  }
}
</script>

<style lang="postcss" scoped src="./headline.pcss">
  
</style>