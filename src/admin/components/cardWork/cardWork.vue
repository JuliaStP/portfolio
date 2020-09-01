<template lang="pug">
  .card-work
    .card-work__preview
      img(:src="project.img").card-work__img
      tags.card-work__tags 
        ul.tags__list
          li.tags__item(v-for="tag in tags") {{tags}}
    .card-work__desc
      h4.card-work__title {{project.title}}
      p.card-work__text {{project.desc}}
      a(:href="project.link").card-work__link {{project.link}}
      .card-work__btns
        button Править 
        button Удалить

</template>

<script>

// import tag from './components/tag';

export default {
  // components: {
  //   tag
  // },
  props: {
    project: {
      type: Object
    }
  },
  computed: {
    tag() {
      return this.project.skills.split(', ')
    }
  }
}
</script>

<style lang="pcss" scoped src='./cardWork.pcss'></style>