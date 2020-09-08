<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editMode === false">
      <div class="text">{{ value }}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editMode = true"></icon>
        <icon symbol='trash' class="edit-line__btn" @click="$emit('remove', $event)" grayscale />
      </div>
    </div>
    <div class="title" v-else>
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
          <icon symbol="tick" @enter="onApprove" @click="$emit('edit-category', editMode = false)"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="editMode = false"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import{Validator, mixin as ValidatorMixin} from 'simple-vue-validator';
import { mapActions } from 'vuex';

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
      editMode: this.editmodeDefault,
      title: this.value,
      category: { 
        title: '',
       },
    }
  },
  methods: {
    async onApprove() {
      if ((await this.$validate()) === false) 
      return;
      if (this.value.trim() === "") return false;
      if (this.title.trim() === this.value.trim()) {
        this.editMode = false;
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