<template>
  <div class="add-tags-component">
    <app-input 
      title="Добавление тега" 
      v-model="currentTags"
      @input="$emit('change-tags', currentTags)"
    />
    <ul class="tags">
      <li class="tag"
        v-for="(tag, index) in tagsArray"
        :key="`${tag}${index}`"
        
      >
        <tag
          v-if="tag.trim()"
          interactive 
          :title="tag"
          @click="removeTag(tag)"
        /> 
      </li>
    </ul>
  </div>
</template>

<script>
import appInput from "../input";
import tag from "../tag";

export default {
  components: {
    appInput,
    tag,
  },
  props: {
    tags: {
      type: String, 
      default: ""
    }
  },
  model: {
    prop: "tags",
    event: "changeTags"
  },
  data() {
    return {
      currentTags: this.tags
    }
  },
  computed: {
    tagsArray() {
      return this.currentTags.trim().split(',');
    }
  },
  methods: {
    removeTag(tag) {
      const tags = [...this.tagsArray];
      const tagIndex = tags.indexOf(tag);
      if (tagIndex < 0) return;
      tags.splice(tagIndex, 1);
      this.currentTags = tags.join(", ");
      this.$emit("changeTags", this.currentTags);
    }
  }
};
</script>

<style lang="postcss" scoped>
  .tags {
    display: flex;
    margin-top: 20px;
  }
  .tag {
    margin-right: 10px;
  }
</style>