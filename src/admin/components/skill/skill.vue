<template>
  <div class="skill-component" v-if="currentSkill.editMode === false">
    <div class="title">{{skill.title}}</div>
    <div class="percent">{{skill.percent}}  %</div>
    <div class="buttons">
      <icon symbol='pencil' class="about-btn" @click="currentSkill.editMode = true" grayscale />
      <icon symbol='trash' class="about-btn" @click="$emit('remove', currentSkill)" grayscale />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="title">
      <app-input noSidePaddings v-model="currentSkill.title"/>
    </div>
    <div class="percent">
      <app-input
      v-model="currentSkill.percent"
      type="number"
      min="0"
      max="100"
      maxlength="3" 
      noSidePaddings
     />
    </div>
    <div class="buttons">
      <icon symbol='tick' class="btn" @click="$emit('approve', currentSkill)"/>
      <icon symbol='cross' class="btn" @click="currentSkill.editMode = false" />
    </div>
  </div>
</template>

<script>
import input from "../input";
import icon from "../icon";


export default {
  props: {
    skill: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category,
        editMode: false
      }
    }
  },
  components: {
    icon,
    appInput: input
  }
};
</script>

<style lang="postcss" src="./skill.pcss">

</style>