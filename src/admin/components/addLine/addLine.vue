<template>
  <div 
    :class="['add-line-component', {blocked: blocked}]">
    <div class="title">
      <app-input v-model="skill.title" placeholder="Новый навык" />
    </div>
    <div class="percentage">
      <app-input v-model="skill.percentage" type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="button">
      <round-button type="round" @click="handleClick" />
    </div>
  </div>
</template>

<script>
import input from "../input";
import button from "../button";

export default {
  props: {
    blocked: Boolean
  },
  components: {
    appInput: input,
    roundButton: button,
  },
  data() {
    return {
      skill: {
        title: '',
        percentage: ''
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('approve', this.skill)
    }
  }
};
</script>

<style lang="postcss" scoped src="./addLine.pcss"></style>