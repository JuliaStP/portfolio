<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
        <icon symbol='trash' class="btn" @click="$emit('remove', $event)" grayscale />
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorText="errorText"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
          v-model="category.title" :errorMessage="validation.firstError('category.title')"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @enter="onApprove" @click="$emit('edit-category', $event)"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove', $event)"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import{Validator, mixin as ValidatorMixin} from 'simple-vue-validator';

export default {
  mixins: [ValidatorMixin],
  validators: {
    'category.title': value => {
      return Validator.value(value).required('Введите название категории');
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
    blocked: Boolean,
  },
  data() {
    return {
      editmode: this.editmodeDefault,
      title: this.value,
      category: { title: '' }
    };
  },
  methods: {
    onApprove() {
      if (this.value.trim() === "") return false;
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
};
</script>

<style lang="postcss" scoped src="./editLine.pcss">

</style>