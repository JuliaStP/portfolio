import addTags from "./addTags.vue";

export default {
  title: "addTags",
  components: {addTags}
}

export const defaultView = () => ({
  components: { addTags },
  data() {
    return {
      tags: "HTML, CSS, Javascript"
    }
  },
  template: `
      <add-tags  v-model="tags" />
  `
});

defaultView.story = {
  name: "Стандартный вид",
  parameters: {
    backgrounds: [
      { name: 'grey', value: '#8395a7', default: true },
    ],
  },
};