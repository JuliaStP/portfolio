<template>
  <div 
    :class="['add-line-component', {blocked: blocked}]">
    <div class="title">
      <app-input :errorMessage="validation.firstError('skill.title')" v-model="skill.title" placeholder="Новый навык" />
    </div>
    <div class="percent">
      <app-input :errorMessage="validation.firstError('skill.percent')" v-model="skill.percent" type="number" min="0" max="100" maxlength="3" />
    </div>
    <div class="button">
      <round-button type="round" @click="handleClick" />
    </div>
  </div>
</template>

<script>
import{Validator, mixin as ValidatorMixin} from 'simple-vue-validator';

import input from "../input";
import button from "../button";

export default {
  mixins: [ValidatorMixin],
  validators: {
    'skill.title': value => {
      return Validator.value(value).required('Введите навык');
    },
    'skill.percent': value => {
      return Validator.value(value)
        .required('Введите процент')
        .integer('Введите число')
        .between(0, 100, 'Введите от 0 до 100')
    },
  },
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
        percent: ''
      }
    }
  },
  methods: {
    async handleClick() {
      if (await this.$validate() === false) 
        return;
      this.$emit('approve', this.skill)
    }
  }
};
</script>

<style lang="postcss" scoped src="./addLine.pcss"></style>