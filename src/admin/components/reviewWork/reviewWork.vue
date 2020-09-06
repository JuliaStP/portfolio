<template lang="pug">
  .review-work(v-if="editMode === false")
    .review-header
      .user-display__avatar
        .user-display__avatar-wrapper
          img(:src="cover", alt="user avatar").user-display__pic
      .user-display__data
        .user-display__name {{review.author}}
        .user-display__occ {{review.occ}}
    .review-text {{review.text}}
    .card-work__btns
      icon(symbol="pencil" title="Править" @click="$emit('edit', $event)")  
      icon(symbol="cross" title="Удалить" @click="$emit('remove-review', $event)")
</template>

<script>

import icon from "../icon";

export default {
  components: {
    icon
  },
  props: {
    review: {
      type: Object,
      default: () => {},
      required: true
    },
    editModeByDefault: Boolean,
  },
  data() {
    return {
      editMode: this.editModeByDefault,
      currentReview: {
        id: this.review.id,
        author: this.review.author,
        occ: this.review.occ,
        text: this.review.text,
      }
    }
  },
  computed: {
    cover() {
      return `https://webdev-api.loftschool.com/${this.review.photo}`
    }
  }
}
</script>

<style lang="postcss" scoped src= './reviewWork.pcss'>

</style>