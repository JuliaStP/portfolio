<template>
  <div 
    :class="['add-line-component', {blocked: blocked}]"
  >
    <div class="title">
      <app-input placeholder="Новый навык" />
    </div>
    <div class="percentage">
      <app-input type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="button">
      <round-button type="round" />
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
};
</script>

<style lang="postcss" scoped src="./addLine.pcss"></style>