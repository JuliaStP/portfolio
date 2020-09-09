<template lang="pug">
  .card-work
    .card-work__preview
      img(:src="cover").card-work__img
      .tags 
        tags-list(:tags="project.techs").card-work__tags
    .card-work__desc
      h4.card-work__title {{project.title}}
      p.card-work__text {{project.description}}
      a(:href="project.link").card-work__link {{project.link}}
      .card-work__btns
        icon(symbol="pencil" title="Править" @click="$emit('open-project', project)")  
        icon(symbol="cross" title="Удалить" @click="$emit('remove-project', $event)")
</template>

<script>

import icon from "../icon";
import tagsList from "../tagsList";
import { mapActions } from 'vuex';

export default {
  components: {
    icon,
    tagsList
  },
  props: {
    project: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.project.photo}`
    },

  }
}
</script>

<style lang="pcss" scoped src='./cardWork.pcss'></style>