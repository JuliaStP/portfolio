<template lang="pug">
  .card-work
    .card-work__preview
      img(:src="cover").card-work__img
      .tags(:tags="project.techs").card-work__tags 
        ul.tags__list
          li.tags__item(v-for="tag in tags") {{tag}}
    .card-work__desc
      h4.card-work__title {{project.title}}
      p.card-work__text {{project.description}}
      a(:href="project.link").card-work__link {{project.link}}
      .card-work__btns
        icon(symbol="pencil" title="Править")  
        icon(symbol="cross" title="Удалить")
</template>

<script>

import icon from "../icon";

export default {
  components: {
    icon
  },
  props: {
    project: {
      type: Object
    }
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.project.photo}`
    }
  }
}
</script>

<style lang="pcss" scoped src='./cardWork.pcss'></style>