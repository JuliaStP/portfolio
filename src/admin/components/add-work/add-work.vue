<template lang="pug">
  .add-work
    form.add-work__form
      input(v-model="work.title").add-work__input
      input(v-model="work.link").add-work__input
      button(type="sumbit") Отправить
</template>

<script>

export default {

 data() {
   return {
     work: {
       title: '',
       link: ''
     }
   }
 }
}
</script>

<style lang="pcss">



</style>