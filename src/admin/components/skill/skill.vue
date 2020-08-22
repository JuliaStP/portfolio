<template>
  <div class="skill-component" v-if="editMode === false">
    <div class="title">{{skill.title}}</div>
    <div class="percentage">{{skill.percentage}}  %</div>
    <div class="buttons">
      <icon symbol='pencil' class="btn" @click="editMode = true" grayscale />
      <icon symbol='trash' class="btn" @click="$emit('remove', skill.id)" grayscale />
    </div>
  </div>

  <div class="skill-component" v-else>
    <div class="title">
      <app-input noSidePaddings v-model="currentSkill.title"/>
    </div>
    <div class="percentage">
      <app-input
      v-model="currentSkill.percentage"
      type="number"
      min="0"
      max="100"
      maxlength="3" 
     />
    </div>
    <div class="buttons">
      <icon symbol='tick' class="btn" @click="$emit('approve', currentSkill)"/>
      <icon symbol='cross' class="btn" @click="editMode = false" />
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
      editMode: false,
      currentSkill: {
        id: 0,
        title: this.skill.title,
        percentage: this.skill.percentage
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