<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <div> {{validation.firstError('categories.name')}} </div>
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorText="errorText"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
          v-model="categories.name"
          :class="{'error' :validation.hasError('categories.name')}"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click.prevent="submit" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import{Validator} from 'simple-vue-validator';

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'categories.name'(value) {
      return Validator.value(value).required('Введите название группы');
    }
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    editmodeDefault: Boolean,
    blocked: Boolean
  },
  data() {
    return {
      editmode: this.editmodeDefault,
      title: this.value,
      // errors: [],
      // editTitle: null
    };
  },
  methods: {
    onApprove() {
      this.$validate().then(success => {
        if(!sucess) return;

        this.validation.reset()
      })

      if (this.title.trim() === this.value.trim()) {
        this.editmode = false;
      } else {
        this.$emit("approve", this.value);
      }
    },
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input"),
  },
  created() {
    this.categories = require('../../data/categories.json')
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss">

</style>