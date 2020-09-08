<template lang="pug">
  .card-work
    .card-work__preview
      img(:src="cover").card-work__img
      .tags 
        tags-list(:tags="currentProject.techs").card-work__tags
    .card-work__desc
      h4.card-work__title {{currentProject.title}}
      p.card-work__text {{currentProject.description}}
      a(:href="currentProject.link").card-work__link {{currentProject.link}}
      .card-work__btns
        icon(symbol="pencil" title="Править" @click="$emit('open-project', currentProject)")  
        icon(symbol="cross" title="Удалить" @click="$emit('remove-project', $event)")
</template>

<script>

import icon from "../icon";
import tagsList from "../tagsList";

export default {
  components: {
    icon,
    tagsList
  },
  props: {
    project: {
      type: Object
    },
    // currentProject: {
    //   type: Object,
    //   default: () => {}
    // },
  },
    data() {
    return {
      currentProject: {
        id: this.project.id,
        title: this.project.title,
        description: this.project.description,
        link: this.project.link,
        techs: this.project.techs,
        editMode: false
      }
    }
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.project.photo}`
    },

  }
}
</script>

<style lang="pcss" scoped src='./cardWork.pcss'></style>